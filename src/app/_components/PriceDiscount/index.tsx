'use client'

import React, { useEffect, useState } from 'react'
import { Product } from '../../../payload/payload-types'
import classes from './index.module.scss'

export const calculatePriceWithDiscount = (
  price: number,
  discount: number,
  quantity: number = 1,
): { originalPrice: string; modifiedPrice: string } => {
  const totalPrice = price * quantity
  const discountAmount = totalPrice * (discount / 100)
  const discountedPrice = totalPrice - discountAmount

  const originalPrice = totalPrice.toLocaleString('en-US', {
    style: 'currency',
    currency: 'INR',
  })

  const modifiedPrice = discountedPrice.toLocaleString('en-US', {
    style: 'currency',
    currency: 'INR',
  })

  return { originalPrice, modifiedPrice }
}

export const Price: React.FC<{
  product: Product
  quantity?: number
  button?: 'addToCart' | 'removeFromCart' | false
}> = props => {
  const { product: { price, discount } = {}, button = 'addToCart', quantity = 1 } = props

  const [priceDisplay, setPriceDisplay] = useState<{
    originalPrice: string
    modifiedPrice: string
  }>(() => calculatePriceWithDiscount(price, discount, quantity))

  useEffect(() => {
    setPriceDisplay(calculatePriceWithDiscount(price, discount, quantity))
  }, [price, discount, quantity])

  return (
    <div className={classes.actions}>
      {priceDisplay?.originalPrice && priceDisplay?.modifiedPrice && (
        <div className={classes.price}>
          <p className={classes.originalPrice}>{priceDisplay.originalPrice}</p>
          <p>{priceDisplay.modifiedPrice}</p>
        </div>
      )}
    </div>
  )
}
