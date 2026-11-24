import { Button, Center, Stack, Text, Title } from '@mantine/core'
import { Component, type ErrorInfo, type ReactNode } from 'react'

import { logger } from '@/utils/logger'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return {
      hasError: true,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error('Unhandled React error', {
      error,
      componentStack: errorInfo.componentStack,
    })
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <Center mih="100vh" p="md">
          <Stack align="center" gap="md">
            <Title order={2}>Something went wrong</Title>

            <Text c="dimmed" ta="center">
              An unexpected error occurred. Please try again.
            </Text>

            <Button onClick={this.handleRetry}>Try again</Button>
          </Stack>
        </Center>
      )
    }

    return this.props.children
  }
}