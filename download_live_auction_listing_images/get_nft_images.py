import os
import time
import requests
import ssl
from http.client import RemoteDisconnected
from urllib import request
from web3 import Web3
from dotenv import load_dotenv
from contract_abi import abi
load_dotenv()


provider = os.getenv('WEB3_PROJECT_ID')
w3 = Web3(Web3.HTTPProvider(provider))

LIVE_AUCTION_ADDRESS = os.getenv('LIVE_AUCTION_ADDRESS')
CONTRACT_ABI = abi
CONTRACT_INSTANCE = w3.eth.contract(address=LIVE_AUCTION_ADDRESS, abi=CONTRACT_ABI)
IMAGE_URL_TEXT_FILE = 'urls/image_urls.txt'

# Set start_block var to preferred blocknumber
start_block = 0
EVENT_FILTER = CONTRACT_INSTANCE.events.NftForAuction.createFilter(
    fromBlock=start_block
)   

_create_unverified_https_context = ssl._create_unverified_context
ssl._create_default_https_context = _create_unverified_https_context


# Downloads NFT images 
def download_nft_images():
    nft_img_list = []
    img_id = 1
    with open(IMAGE_URL_TEXT_FILE, 'r') as file:
        # Splits imgages into array to be downloaded one at a time.
        nft_img_list = file.read().split()
    for img_url in nft_img_list:
        try:
            request.urlretrieve(
                img_url, f'nft_images/auction_item_{img_id}.png'
            )
        except RemoteDisconnected:
            print("RemoteDisconected: Moving to next iteration")
            continue
        img_id += 1


# Prints the NewListing event's URI
def handle_nft_uri(event):
    # Grabs the URI field from event
    token_uri = event["args"]["URI"]
    response = requests.get(token_uri)
    response_json = response.json()
    print(response_json)
    with open(IMAGE_URL_TEXT_FILE, 'a') as file:
        file.write(f'{response_json["image"]}\n') 


# Queries the blockchain to collect NewListing events.
def get_log_event():
    open(IMAGE_URL_TEXT_FILE, "w").close()
    for event in EVENT_FILTER.get_all_entries():
        # Calls function to retrieve NFT url from queried event
        handle_nft_uri(event)
        two_second = 2
        time.sleep(two_second)
    download_nft_images()
get_log_event()

