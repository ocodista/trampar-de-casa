"use client"
import { Component, ErrorInfo, ReactNode } from "react"
import { toast } from "./components/ui/use-toast"

type Props = {
  toast: typeof toast
  children: ReactNode
}
type State = {
  hasError: boolean
}

export class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props){
    super(props)
  }
  componentDidCatch(_error: Error, _errorInfo: ErrorInfo): void {
    this.props.toast({
      title: "Oops",
      variant: "destructive",
      description: 'Algo deu errado 🥶',
    });
  }

  render() {
    return this.props.children;
  }
}
