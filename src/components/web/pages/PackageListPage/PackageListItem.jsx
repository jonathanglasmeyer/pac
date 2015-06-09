import React, {PropTypes} from 'react';
import ValidatedComponent from 'utils/ValidatedComponent.jsx';

import {ListItem, Body, Subhead} from '../../widgets/index.js';

@Radium
export default class PackageListItem extends ValidatedComponent {

  static propTypes = {
    pack: PropTypes.object.isRequired,
    uninstall: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired // for parent
  }

  render() {
    const {pack, onClick} = this.props;
    const dateInstalledRelative = pack['Install Date'].fromNow();


    return <ListItem
      onClick={() => onClick(pack)}>


      <div>
        <Subhead>{pack.Name}</Subhead>
        <Body secondary>
          {' '}({dateInstalledRelative})
        </Body>
      </div>

      <Body secondary>
       {' '} {pack.Description}
      </Body>
    </ListItem>;
  }

}
