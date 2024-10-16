const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const stripeController = async (req, res) => { 
  const { purchase, total_amount, shipping_fee } = req.body;
  const calculateOrderAmount = (total) => {
    return total + shipping_fee;
  }
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(total_amount),
    currency: 'cad'
  })
  res.json({ clientSecret: paymentIntent.client_secret })
}

module.exports = stripeController