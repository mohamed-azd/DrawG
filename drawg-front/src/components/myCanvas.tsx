import { Component } from 'react'
import CanvasDraw from 'react-canvas-draw'
import { socket } from '../App'

export default class MyCanvas extends Component<{ roomId: string, isDrawer: boolean, data?: string }> {
    loadableDraw?: CanvasDraw | null

    onChange() {
        if (this.props.isDrawer) {
            socket.emit('draw', { roomId: this.props.roomId, canvasData: this.loadableDraw?.getSaveData() })
        }
    }

    componentDidUpdate(prevProps: { roomId: string, isDrawer: boolean, data?: string }) {
        if (this.props.data && prevProps.data !== this.props.data && !this.props.isDrawer) {
            this.loadableDraw?.loadSaveData(this.props.data as string, true)
        }
    }

    render() {
        return (
            <CanvasDraw disabled={!this.props.isDrawer} className={'canvas'} ref={canvasDraw => (this.loadableDraw = canvasDraw)} 
            onChange={() => this.onChange()} loadTimeOffset={0} style={{width: '90%', height: '70%'}}></CanvasDraw>
        )
    }
}