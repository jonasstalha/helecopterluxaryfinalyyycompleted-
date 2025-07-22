// Payment Links example - Not recommended for complex bookings
// Better for simple products or services

// Backend code to create payment link
const paymentLink = await stripe.paymentLinks.create({
  line_items: [
    {
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Helicopter Tour - Robinson R44',
          description: '1 hour scenic helicopter tour',
        },
        unit_amount: 50000, // $500.00
      },
      quantity: 1,
    },
  ],
  after_completion: {
    type: 'redirect',
    redirect: {
      url: 'https://yourdomain.com/booking/confirmation',
    },
  },
});

// Share this URL: paymentLink.url
// Example: https://buy.stripe.com/test_14k7sF2eK9rs4
