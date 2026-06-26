'use client';

import { useCallback } from 'react';

const loadScript = (src) => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
};

export const useRazorpay = () => {
    const initializePayment = useCallback(async ({ subscriptionId, onPaymentSuccess, onPaymentFailure, planName }) => {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

        if (!res) {
            console.error('Razorpay SDK failed to load. Are you online?');
            return false;
        }

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
            subscription_id: subscriptionId, // The subscription_id we got from backend
            name: 'TalentHOLD',
            description: `Subscription for ${planName}`,
            image: '/logo.png', // Optional: We can update this with actual logo path
            handler: function (response) {
                // Successful payment
                onPaymentSuccess({
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpaySubscriptionId: response.razorpay_subscription_id,
                    razorpaySignature: response.razorpay_signature,
                });
            },
            theme: {
                color: '#761ED3', // Matching TalentHOLD's purple theme
            },
            modal: {
                ondismiss: function () {
                    if (onPaymentFailure) onPaymentFailure();
                }
            }
        };

        const paymentObject = new window.Razorpay(options);
        
        paymentObject.on('payment.failed', function (response) {
            console.error('Payment failed', response.error);
            if (onPaymentFailure) onPaymentFailure(response.error);
        });

        paymentObject.open();
        return true;
    }, []);

    return { initializePayment };
};
