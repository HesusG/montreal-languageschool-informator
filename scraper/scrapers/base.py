"""Base scraper class with common functionality."""

import requests
from bs4 import BeautifulSoup
from datetime import date

from config import USER_AGENT


class BaseScraper:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({'User-Agent': USER_AGENT})
        self.today = date.today().isoformat()

    def fetch(self, url: str) -> BeautifulSoup:
        response = self.session.get(url, timeout=30)
        response.raise_for_status()
        return BeautifulSoup(response.text, 'lxml')

    def scrape(self) -> list[dict]:
        raise NotImplementedError
