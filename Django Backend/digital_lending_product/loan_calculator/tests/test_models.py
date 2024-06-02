from django.test import TestCase
from ..models import Customer, LoanOffer

class CustomerModelTestCase(TestCase):
    def test_customer_create(self):
        customer = Customer.objects.create(
            name='John Doe',
            email='john@example.com',
            city='New York',
            zip_code='12345'
        )
        self.assertEqual(str(customer), 'John Doe')

class LoanOfferModelTestCase(TestCase):
    def setUp(self):
        self.customer = Customer.objects.create(
            name='Jane Smith',
            email='jane@example.com',
            city='Los Angeles',
            zip_code='67890'
        )

    def test_loan_offer_create(self):
        loan_offer = LoanOffer.objects.create(
            customer=self.customer,
            amount=10000.00,
            interest_rate=5.00,
            term=36
        )
        self.assertEqual(str(loan_offer), 'Jane Smith - 10000.00 - 36 months')