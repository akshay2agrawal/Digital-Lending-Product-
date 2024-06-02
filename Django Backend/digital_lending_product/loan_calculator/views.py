from django.shortcuts import render
# import view sets from the REST framework
from rest_framework import viewsets, serializers
#import Serializer from the loan_calculator app
from .serializers import CustomerSerializer, LoanOfferSerializer
#import models from the loan_calculator app
from .models import Customer, LoanOffer
import rest_framework.status as status


# Create a view set for the Customer model
class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


# Create a view set for the LoanOffer model
class LoanOfferViewSet(viewsets.ModelViewSet):
    queryset = LoanOffer.objects.all()
    serializer_class = LoanOfferSerializer

    