import {Provider} from 'react-redux';

//引入框架定义，在此处初始化REDUX
import Redux from './redux';

//多语言支持
import { addLocaleData, IntlProvider } from 'react-intl';
//多语言定义
import enLocale from './intl/en-US.js';
import cnLocale from './intl/zh-CN.js';

//------------------此部分可以修改-------------------
import UserRouter from './modules/user/router';
import DashboardRouter from './modules/dashboard/router';
import HomeRouter from './modules/home/router';
import ProjectRouter from './modules/project/router';
import CommonRouter from './modules/common/router';
//--------------------------------------------------

//读取多语言配置
const isZhCN =
  (typeof localStorage !== 'undefined' && localStorage.getItem('locale') === 'zh-CN') ||
  (navigator.language === 'zh-CN');
const appLocale = isZhCN ? cnLocale : enLocale;
addLocaleData(appLocale.data);

const APPRouter = (
    <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
        <Router history={History}>
            <Route path="/" component={Redux}>
                //------------------此处用于装配路由，可以修改-------------------
                //部分Route支持扩展，这种Route的标签使用时可以支持嵌套
                {UserRouter}
                <DashboardRouter>
                    {ProjectRouter}
                    {HomeRouter}
                    {CommonRouter}
                </DashboardRouter>                
                <IndexRedirect to='/dashboard'/>
            //-------------------------------------------------------------
            </Route>
        </Router>
    </IntlProvider>
);

export default APPRouter;