import React from "react";
import './index.css';
import { Card, Input, Space, Button } from "antd";

class Query extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            common: ''
        }
    }

    onChange (e) {
        this.setState({common: e.target.value})
    }

    reset (e) {
        this.setState({common: ''})
    }

    componentDidMount () {
    }

    query() {
        if (!this.state.common) {
            this.props.query('flush')
            return 
        }
        const common = this.state.common.split(' ')
        console.log('c', common)
        const J = this.state.common.split(' ')[0]
        const W = this.state.common.split(' ')[1]
        const images = this.props.images
        const result = []
        for (let i = 0; i < images.length; i++) {
            const location = eval(images[i].location)
            const JFW = []
            JFW.push(location[0].split(',')[0])
            JFW.push(location[2].split(',')[0])
            const WFW = []
            WFW.push(location[0].split(',')[1])
            WFW.push(location[2].split(',')[1])
            console.log("s", JFW, WFW)
            if (common[0] >= JFW[0] && common[0] <= JFW[1] && common[1] >= WFW[0] && common[1] <= WFW[1]) {
                result.push(images[i])
            }
        }
        this.props.query(result)
    }

    render() {
        console.log('common', this.state.common)
        return (
            <div>
                <Card className='card'>
                    <Space>
                        <Input
                            type="text"
                            placeholder='请输入空格分割的经纬度  (例：经度 纬度)'
                            style={{ width: '38.7vw' }}
                            onInput={e => this.onChange(e)}
                            value={this.state.common}
                        />
                        <Button onClick={e => this.reset(e)}>重置</Button>
                        <Button type='primary' onClick={() => this.query()}>搜索</Button>
                    </Space>
                </Card>
            </div>
        )
    }
}

export default Query