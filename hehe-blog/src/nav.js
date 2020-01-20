// 导航栏目录
import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to='/'>自我简介</Link>
                    </li>
                    <li>
                        <Link to='/travelPlan'>游玩规划</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
