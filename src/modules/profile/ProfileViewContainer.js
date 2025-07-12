// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import ProfileEditView from './ProfileEditView';

export default compose(connect())(ProfileEditView);
