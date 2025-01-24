import { NextResponse } from 'next/server'
import  prisma  from '@/lib/prisma'
import { TransactionStatus, TransactionType } from '@prisma/client'

export async function POST(request: Request) {
  try {
    const { token, userId } = await request.json()

    // Validate inputs
    if (!token || !userId) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 })
    }

    if (token <= 0) {
      return NextResponse.json({ success: false, error: 'Token amount must be positive' }, { status: 400 })
    }

    // Create transaction record
    const transaction = await prisma.transaction.create({
      data: {
        userId,
        amount: token,
        type: TransactionType.PURCHASE,
        status: TransactionStatus.COMPLETED
      }
    })

    // Update user tokens
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        tokens: {
          increment: token
        }
      }
    })

    return NextResponse.json({ 
      success: true,
      transaction,
      user
    })

  } catch (error) {
    console.error('Error in token purchase:', error)
    return NextResponse.json({ success: false, error: 'Failed to process token purchase' }, { status: 500 })
  }
}
