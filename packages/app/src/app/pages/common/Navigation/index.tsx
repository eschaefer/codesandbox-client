import React, { FunctionComponent } from 'react';

import { Overlay } from 'app/components/Overlay';
import { useOvermind } from 'app/overmind';

import { SignInButton } from '../SignInButton';
import { UserMenu } from '../UserMenu';

import {
  ExploreAction,
  NewSandboxAction,
  PatronAction,
  SearchAction,
  ShowNotificationsAction,
} from './Actions';
import {
  Actions,
  Border,
  LogoWithBorder,
  Row,
  Title,
  TitleWrapper,
  Wrapper,
} from './elements';
import { Notifications } from './Notifications';

type Props = {
  float?: boolean;
  searchNoInput?: boolean;
  title: string;
};
export const Navigation: FunctionComponent<Props> = ({
  float = false,
  searchNoInput,
  title,
}) => {
  const {
    actions: {
      userNotifications: { notificationsClosed, notificationsOpened },
    },
    state: {
      isLoggedIn,
      isPatron,
      user,
      userNotifications: { notificationsOpened: notificationsMenuOpened },
    },
  } = useOvermind();

  return (
    <Row justifyContent="space-between" float={float}>
      <TitleWrapper>
        <a href="/?from-app=1">
          <LogoWithBorder height={35} width={35} />
        </a>

        <Border role="presentation" />

        <Title>{title}</Title>
      </TitleWrapper>

      <Wrapper>
        <Actions>
          <SearchAction searchNoInput={searchNoInput} />

          <ExploreAction />

          {!isPatron && <PatronAction />}

          {user && (
            <Overlay
              content={Notifications}
              event="Notifications"
              isOpen={notificationsMenuOpened}
              noHeightAnimation
              onClose={notificationsClosed}
              onOpen={notificationsOpened}
            >
              {open => <ShowNotificationsAction openNotifications={open} />}
            </Overlay>
          )}

          <NewSandboxAction />
        </Actions>

        {isLoggedIn ? <UserMenu /> : <SignInButton />}
      </Wrapper>
    </Row>
  );
};
