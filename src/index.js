require('core-js/features/object/define-property')
require('core-js/features/object/create')
require('core-js/features/object/assign')
require('core-js/features/array/for-each')
require('core-js/features/array/index-of')
require('core-js/features/function/bind')
require('core-js/features/promise')
import 'object-defineproperty-ie8'
import React from 'react';

import ReactDom from 'react-dom';



ReactDom.render(
    <div>123</div>,
    document.getElementById('root')
)