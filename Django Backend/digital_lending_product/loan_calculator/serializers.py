# import serializers from the REST framework
from rest_framework import serializers
# Import models from the loan_calculator app
from .models import Customer, LoanOffer
from rest_framework.response import Response
from django.http import JsonResponse
import rest_framework.status as status

#create a serializer for the Customer model
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

#create a serializer for the LoanOffer model
class LoanOfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanOffer
        fields = '__all__'
        read_only_fields = ('monthly_payment',)

    def validate(self, data):
        if data['term'] <= 0 or data['term'] > 999:
            raise serializers.ValidationError("Loan term must be in range 1-999.")
        if data['interest_rate'] <= 0 or data['interest_rate'] > 30:
            raise serializers.ValidationError("Interest rate must be in range 0.01-30.")
        if data['amount'] <= 0:
            raise serializers.ValidationError("Loan amount must be greater than 0.")

        customer = data['customer']
        if not isinstance(customer, Customer):
            raise serializers.ValidationError("Customer must be a Customer instance.")

        return data

    def create(self, validated_data):
        print('>inside create method<')
        amount = validated_data.get('amount')
        interest_rate = validated_data.get('interest_rate')
        term = validated_data.get('term')
        customer = validated_data.get('customer')

        # Calculate monthly payment
        monthly_payment = amount * (interest_rate / 1200) / (1 - (1 + interest_rate / 1200) ** (-term))
        validated_data['monthly_payment'] = round(monthly_payment, 2)

        try:
            print('Creating loan offer...')
            return super().create(validated_data)
        except :
            raise serializers.ValidationError(f"An error occurred while creating the loan offer: {str(e)}")
