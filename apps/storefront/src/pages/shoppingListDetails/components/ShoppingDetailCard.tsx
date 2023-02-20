import {
  ReactElement,
} from 'react'

import {
  Box,
  CardContent,
  Typography,
  styled,
  TextField,
} from '@mui/material'
import {
  Delete,
  Edit,
} from '@mui/icons-material'

import {
  getProductOptionsFields,
} from '../shared/config'

interface ShoppingDetailCardProps {
  item: any,
  onEdit: (item: any, variantId: number | string, itemId: number | string) => void,
  onDelete: (itemId: number) => void,
  currencyToken: string,
  handleUpdateProductQty: (id: number | string, value: number | string) => void,
  handleUpdateShoppingListItem: (itemId: number | string) => void,
  checkBox?: () => ReactElement,
  isReadForApprove: boolean,
  len: number,
  itemIndex?: number,
  setDeleteOpen: (value: boolean) => void
}

const StyledImage = styled('img')(() => ({
  maxWidth: '60px',
  height: 'auto',
  marginRight: '0.5rem',
}))

const defaultProductImage = 'https://cdn11.bigcommerce.com/s-1i6zpxpe3g/stencil/cd9e3830-4c73-0139-8a51-0242ac11000a/e/4fe76590-73f1-0139-3767-32e4ea84ca1d/img/ProductDefault.gif'

const ShoppingDetailCard = (props: ShoppingDetailCardProps) => {
  const {
    item: shoppingDetail,
    onEdit,
    onDelete,
    checkBox,
    currencyToken = '$',
    handleUpdateProductQty,
    handleUpdateShoppingListItem,
    isReadForApprove,
    len,
    itemIndex,
    setDeleteOpen,
  } = props

  const {
    basePrice,
    quantity,
    itemId,
    variantId,
    primaryImage,
    productName,
    variantSku,
    productsSearch,
    productUrl,
  } = shoppingDetail

  const total = +basePrice * +quantity
  const price = +basePrice

  const product: any = {
    ...shoppingDetail.productsSearch,
    selectOptions: shoppingDetail.optionList,
  }

  const productFields = (getProductOptionsFields(product, {}))

  const optionList = JSON.parse(shoppingDetail.optionList)
  const optionsValue: CustomFieldItems[] = productFields.filter((item) => item.valueText)

  return (
    <Box
      key={shoppingDetail.id}
      sx={{
        borderTop: '1px solid #D9DCE9',
        borderBottom: itemIndex === len - 1 ? '1px solid #D9DCE9' : '',
      }}
    >
      <CardContent
        sx={{
          color: '#313440',
          display: 'flex',
          pl: 0,
        }}
      >
        <Box>
          {
            checkBox && checkBox()
          }
        </Box>
        <Box>
          <StyledImage
            src={primaryImage || defaultProductImage}
            alt="Product-img"
            loading="lazy"
          />
        </Box>
        <Box
          sx={{
            flex: 1,
          }}
        >
          <Typography
            variant="body1"
            color="#212121"
            onClick={() => {
              const {
                location: {
                  origin,
                },
              } = window

              window.location.href = `${origin}${productUrl}`
            }}
            sx={{
              cursor: 'pointer',
            }}
          >
            {productName}
          </Typography>
          <Typography
            variant="body1"
            color="#616161"
          >
            {variantSku}
          </Typography>
          <Box
            sx={{
              margin: '0 0 0.5rem 0',
            }}
          >
            {
              (optionList.length > 0 && optionsValue.length > 0) && (
                <Box>
                  {
                    optionsValue.map((option: any) => (
                      <Typography
                        sx={{
                          fontSize: '0.75rem',
                          lineHeight: '1.5',
                          color: '#455A64',
                        }}
                        key={option.valueLabel}
                      >
                        {`${option.valueLabel
                        }: ${option.valueText}`}
                      </Typography>
                    ))
                  }
                </Box>
              )
            }
          </Box>

          <Typography
            sx={{
              color: '#212121',
            }}
          >
            {`Price: ${currencyToken}${price.toFixed(2)}`}
          </Typography>

          <TextField
            size="small"
            type="number"
            variant="filled"
            label="qty"
            disabled={isReadForApprove}
            inputProps={{
              inputMode: 'numeric', pattern: '[0-9]*',
            }}
            value={quantity}
            sx={{
              margin: '0.5rem 0',
              width: '60%',
              maxWidth: '100px',
              '& label': {
                zIndex: 0,
              },
            }}
            onChange={(e) => {
              handleUpdateProductQty(shoppingDetail.id, e.target.value)
            }}
            onBlur={() => {
              handleUpdateShoppingListItem(itemId)
            }}
          />
          <Typography
            sx={{
              color: '#212121',
            }}
          >
            {`Total: ${currencyToken}${total.toFixed(2)}`}
          </Typography>
          <Box
            sx={{
              marginTop: '11px',
              textAlign: 'end',
            }}
            id="shoppingList-actionList-mobile"
          >
            {
              optionList.length > 0 && !isReadForApprove && (
                <Edit
                  sx={{
                    marginRight: '0.5rem',
                    cursor: 'pointer',
                    color: 'rgba(0, 0, 0, 0.54)',
                  }}
                  onClick={() => {
                    onEdit(productsSearch, variantId, itemId)
                  }}
                />
              )
            }
            {
              !isReadForApprove && (
              <Delete
                sx={{
                  cursor: 'pointer',
                  color: 'rgba(0, 0, 0, 0.54)',
                }}
                onClick={() => {
                  setDeleteOpen(true)
                  onDelete(+itemId)
                }}
              />
              )
            }

          </Box>
        </Box>
      </CardContent>
    </Box>
  )
}

export default ShoppingDetailCard
