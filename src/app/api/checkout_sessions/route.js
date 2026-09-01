import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../lib/stripe'
import { getUserSession } from '@/lib/api/session'

export async function POST(request) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')
    const user = await getUserSession()
    const formData = await request.formData()

    const consultationFee = formData.get('consultationFee')
    const doctorId = formData.get('doctorId')
    const doctorName = formData.get('doctorName')
    const appointmentDate = formData.get('appointmentDate')
    const appointmentTime = formData.get('appointmentTime')
    const symptoms = formData.get('symptoms')

    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Appointment with Dr. ${doctorName}`,
            },
            unit_amount: Number(consultationFee) * 100,
          },
          quantity: 1,
        },
      ],
      // metadata তে যা রাখবা, ওইটাই পরে paymentSuccess পেজে ফেরত পাবা
      metadata: {
        patientId: user?.id,
        patientName: user?.name || '',
        patientEmail: user?.email || '',
        doctorId,
        doctorName,
        appointmentDate,
        appointmentTime,
        symptoms,
        consultationFee,
        appointmentStatus: 'pending',
      },
      mode: 'payment',
      success_url: `${origin}/dashboard/paymentSuccess?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel?session_id={CHECKOUT_SESSION_ID}`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}