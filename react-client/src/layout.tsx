
import { Brand, Dropdown, DropdownItem, DropdownToggle, Page, PageHeader, PageSection, PageSectionVariants, PageSidebar, Toolbar, ToolbarGroup, ToolbarItem } from '@patternfly/react-core';
import React, { FunctionComponent, ReactNode, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import logo from './assets/logo/logo.svg';
import style from './layout.module.scss';
import { useKeycloak } from './KeycloakContext';
import _ from 'lodash';
import { KeycloakInstance } from 'keycloak-js';

interface LayoutProps {
  children: ReactNode;
  pageNav: ReactNode;
};

export const Layout: FunctionComponent<LayoutProps> = (props) => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const keycloak = useKeycloak();
  let name = loggedInUserName(keycloak);
  const userDropdownItems = [
    <DropdownItem key="1" onClick={() => keycloak.logout()}>Logout</DropdownItem>,
    <DropdownItem key="2" onClick={() => window.location.href = keycloak.createAccountUrl()}>Manage Account</DropdownItem>
  ];
  const PageToolbar = (
    <Toolbar>
      <ToolbarGroup>
        <ToolbarItem>
          <Dropdown
            isPlain
            position="right"
            onSelect={() => setIsUserDropdownOpen((prev) => !prev)}
            isOpen={isUserDropdownOpen}
            toggle={<DropdownToggle onToggle={(val: boolean) => setIsUserDropdownOpen(val)}>{name}</DropdownToggle>}
            dropdownItems={userDropdownItems}
          />
        </ToolbarItem>
      </ToolbarGroup>
    </Toolbar>
  );

  const Header = (
    <PageHeader
      logo={<Brand src={logo} alt="keycloak" className={style.brand} />}
      logoProps={{ href: "/" }}
      toolbar={PageToolbar}
      className={style.header}
    />
  );

  const Sidebar = <PageSidebar nav={props.pageNav} theme="dark" />;

  return (
    <Router>
      <Page header={Header} sidebar={Sidebar} className={style.page}>
        <PageSection variant={PageSectionVariants.light}>
          {props.children}
        </PageSection>
      </Page>
    </Router>
  );
}
function loggedInUserName(keycloak: KeycloakInstance<'native'>) {
  const givenName = _.get(keycloak, 'tokenParsed.given_name');
  const familyName = _.get(keycloak, 'tokenParsed.family_name');
  const userName = (givenName || familyName) || _.get(keycloak, 'tokenParsed.preferred_username');
  let name = 'Anonymous';
  if (givenName && familyName) {
    name = givenName + ' ' + familyName;
  }
  else if (userName) {
    name = userName;
  }
  return name;
}

