from django.test import TestCase
from ..serializers import LoanOfferSerializer, CustomerSerializer
from ..models import Customer, LoanOffer
from decimal import Decimal

class CustomerSerializerTestCase(TestCase):
    def test_customer_serializer(self):
        customer = Customer.objects.create(
            name='John Doe',
            email='john@example.com',
            city='New York',
            zip_code='12345'
        )
        serializer = CustomerSerializer(customer)
        self.assertEqual(serializer.data, {
            'id': customer.id,
            'name': 'John Doe',
            'email': 'john@example.com',
            'created_at': customer.created_at.isoformat().replace('+00:00', 'Z'),
            'city': 'New York',
            'zip_code': '12345'
        })

class LoanOfferSerializerTestCase(TestCase):
    def setUp(self):
        self.customer = Customer.objects.create(
            name='Jane Smith',
            email='jane@example.com',
            city='Los Angeles',
            zip_code='67890'
        )

    def test_loan_offer_validation(self):
        valid_data = {
            'customer': self.customer.id,
            'amount': 10000.00,
            'interest_rate': 5.00,
            'term': 36
        }
        serializer = LoanOfferSerializer(data=valid_data)
        self.assertTrue(serializer.is_valid())

        invalid_data = {
            'customer': self.customer.id,
            'amount': -1000.00,
            'interest_rate': 40.00,
            'term': 1000
        }
        serializer = LoanOfferSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())

    def test_monthly_payment_calculation(self):
        data = {
            'customer': self.customer.id,
            'amount': 10000.00,
            'interest_rate': 5.00,
            'term': 36
        }
        serializer = LoanOfferSerializer(data=data)
        self.assertTrue(serializer.is_valid())  # Check if the serializer is valid

        loan_offer = serializer.save()
        expected_monthly_payment = Decimal('299.71')
        self.assertAlmostEqual(loan_offer.monthly_payment, expected_monthly_payment, places=2)