from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from ..models import Customer, LoanOffer

class CustomerViewSetTestCase(APITestCase):
    def test_list_customers(self):
        url = reverse('customer-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_customer(self):
        url = reverse('customer-list')
        data = {
            'name': 'John Doe',
            'email': 'john@example.com',
            'city': 'New York',
            'zip_code': '12345'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class LoanOfferViewSetTestCase(APITestCase):
    def setUp(self):
        self.customer = Customer.objects.create(
            name='Jane Smith',
            email='jane@example.com',
            city='Los Angeles',
            zip_code='67890'
        )

    def test_list_loan_offers(self):
        url = reverse('loanoffer-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_loan_offer(self):
        url = reverse('loanoffer-list')
        data = {
            'customer': self.customer.id,
            'amount': 10000.00,
            'interest_rate': 5.00,
            'term': 36
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)