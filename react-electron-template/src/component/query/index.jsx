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
        console.log(e.target.value)
        this.setState({common: e.target.value})
    }

    reset (e) {
        this.setState({common: ''})
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
                        <Button type='primary'>搜索</Button>
                    </Space>
                </Card>
            </div>
        )
    }
}

export default Query