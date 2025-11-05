import requests
from bs4 import BeautifulSoup

url = "https://leetcode.com/problems/two-sum/"
headers = {
    'User-Agent': 'Mozilla.s/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
}
response = requests.get(url, headers=headers)

with open("leetcode.html", "w", encoding="utf-8") as f:
    f.write(response.text)

print("HTML content saved to leetcode.html")
