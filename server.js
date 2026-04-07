   }
})

app.listen(3000, "0.0.0.0", () => {
    console.log("Server running")
})
app.post("/midtrans-notification", async (req, res) => {

    const notification = req.body

    console.log("Midtrans notification:", notification)

    const orderId = notification.order_id
    const transactionStatus = notification.transaction_status
    const fraudStatus = notification.fraud_status

    if (transactionStatus === "capture" || transactionStatus === "settlement") {

        if (fraudStatus === "accept" || !fraudStatus) {

            console.log("Payment success for:", orderId)

            // here you would normally update database
            // example:
            // markOrderPaid(orderId)

        }

    } else if (transactionStatus === "pending") {

        console.log("Payment pending:", orderId)

    } else if (
        transactionStatus === "deny" ||
        transactionStatus === "cancel" ||
        transactionStatus === "expire"
    ) {

        console.log("Payment failed:", orderId)

    }

    res.status(200).send("OK")
})
