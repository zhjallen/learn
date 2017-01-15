import NotFound from '../components/notfound';
import {getCookie} from './index';
import Constant from 'react-constant';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import {PropTypes,ContextTypes, Component} from 'react';
import {combineReducers, bindActionCreators} from 'redux';
import {Router , Route, IndexRoute ,IndexRedirect,Link, browserHistory} from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import Immutable from "immutable";
import RootRoute from './rootroute'
import ModuleRoute from './moduleroute'


window.React = React;
window.NotFound = NotFound;
window.Constant = Constant;
window.Immutable = Immutable;
window.Link = Link;
window.connect = connect;
window.FormattedMessage = FormattedMessage;
window.ReactDOM = ReactDOM;
window.PropTypes = PropTypes;
window.ContextTypes = ContextTypes;
window.Component = Component;
window.getCookie = getCookie;
window.combineReducers = combineReducers;
window.bindActionCreators = bindActionCreators;
window.Router = Router;
window.Route = Route;
window.IndexRoute = IndexRoute;
window.RootRoute = RootRoute;
window.ModuleRoute = ModuleRoute;
window.IndexRedirect = IndexRedirect;
window.History = browserHistory;

