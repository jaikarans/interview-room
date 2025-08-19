'use client'

import {
  Toaster as ChakraToaster,
  Portal,
  Spinner,
  Stack,
  Toast,
  createToaster,
} from '@chakra-ui/react'

export const toaster = createToaster({
  placement: 'bottom',
  pauseOnPageIdle: true,
})

const toastStyles = {
  success: {
    bg: 'primary',
    color: 'on-primary',
    indicator: <Toast.Indicator />,
  },
  error: {
    bg: 'error',
    color: 'on-error',
    indicator: <Toast.Indicator />,
  },
  loading: {
    bg: 'blue.50',
    color: 'blue.800',
    indicator: <Spinner size="sm" color="blue.600" />,
  },
  info: {
    bg: 'gray.50',
    color: 'gray.800',
    indicator: <Toast.Indicator />,
  },
}

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: '4' }}>
        {(toast) => (
          // toast.type =  "success" | "error" | "loading" | "info"
          <Toast.Root 
            bg={toastStyles[toast.type].bg}
            color={toastStyles[toast.type].color}
            placement={toastStyles[toast.type].position}
            width={{ md: 'sm' }}
            borderRadius='xl'
          >
            {toast.type === 'loading' ? (
              <Spinner size='sm' color='blue.solid' />
            ) : (
              <Toast.Indicator />
            )}
            <Stack gap='1' flex='1' maxWidth='100%'>
              {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
              {toast.description && (
                <Toast.Description>{toast.description}</Toast.Description>
              )}
            </Stack>
            {toast.action && (
              <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
            )}
            {toast.closable && <Toast.CloseTrigger />}
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  )
}
