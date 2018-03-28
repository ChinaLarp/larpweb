import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';

class Footer extends Component{
	render(){
		return(
			<Row className="footer">
				  <Col span={24} className="copyright">
							©全民侦探社  辽ICP备17021546号-1
				      <Link to="/contact">关于我们</Link>
				      | <a href=''>APP</a>
				      <br/>表演是一门艺术,推理是一种态度。
				      <br/>本网站及游戏均由沈阳蓬勃盛网络科技有限公司开发运营。
				      <br/>本公司所有游戏均处于内测阶段，如有问题请联系我们: larpchina@gmail.com
				      <br/>
		      </Col>
	    </Row>


	    );
	}
}

export default Footer;
