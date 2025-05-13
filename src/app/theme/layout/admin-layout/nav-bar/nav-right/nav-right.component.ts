// angular import
import { Component, Input, OnInit, effect, output, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

// project import
import { AuthenticationService } from 'src/app/theme/shared/service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MantisConfig } from 'src/app/app-config';
import { ThemeService } from 'src/app/theme/shared/service/customs-theme.service';

// third party
import { TranslateService } from '@ngx-translate/core';
import screenfull from 'screenfull';

// icon
import { IconService } from '@ant-design/icons-angular';
import {
  WindowsOutline,
  TranslationOutline,
  BellOutline,
  MailOutline,
  FullscreenOutline,
  SettingOutline,
  FullscreenExitOutline,
  GiftOutline,
  MessageOutline,
  PhoneOutline,
  CheckCircleOutline,
  CloseOutline,
  LogoutOutline,
  EditOutline,
  UserOutline,
  ProfileOutline,
  WalletOutline,
  QuestionCircleOutline,
  LockOutline,
  CommentOutline,
  UnorderedListOutline,
  ArrowRightOutline
} from '@ant-design/icons-angular/icons';

@Component({
  selector: 'app-nav-right',
  imports: [SharedModule, RouterModule],
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent implements OnInit {
  authenticationService = inject(AuthenticationService);
  private translate = inject(TranslateService);
  private iconService = inject(IconService);
  private themeService = inject(ThemeService);

  // public props
  @Input() styleSelectorToggle!: boolean;
  readonly Customize = output();
  windowWidth: number;
  screenFull: boolean = true;
  direction: string = 'ltr';

  // constructor
  constructor() {
    this.windowWidth = window.innerWidth;
    this.iconService.addIcon(
      ...[
        WindowsOutline,
        TranslationOutline,
        BellOutline,
        MailOutline,
        FullscreenOutline,
        SettingOutline,
        FullscreenExitOutline,
        GiftOutline,
        MessageOutline,
        SettingOutline,
        PhoneOutline,
        CheckCircleOutline,
        CloseOutline,
        LogoutOutline,
        EditOutline,
        UserOutline,
        ProfileOutline,
        WalletOutline,
        QuestionCircleOutline,
        LockOutline,
        CommentOutline,
        UnorderedListOutline,
        ArrowRightOutline
      ]
    );
    effect(() => {
      this.isRtlTheme(this.themeService.isRTLMode());
    });
  }

  // life cycle
  ngOnInit() {
    setTimeout(() => {
      this.useLanguage(MantisConfig.i18n);
    }, 0);
  }

  // private method
  private isRtlTheme(isRtl: boolean) {
    this.direction = isRtl === true ? 'rtl' : 'ltr';
  }

  // public method
  // user according language change of sidebar menu item
  useLanguage(language: string) {
    this.translate.use(language);
  }

  megaMenus = [
    {
      name: 'Authentication',
      children: [
        {
          title: 'Login',
          url: '/login'
        },
        {
          title: 'Register',
          url: '/register'
        },
        {
          title: 'Reset Password',
          url: '/'
        },
        {
          title: 'Forgot Password',
          url: '/forgot-password'
        },
        {
          title: 'Verification Code',
          url: '/'
        }
      ]
    },
    {
      name: 'Other Pages',
      children: [
        {
          title: 'About Us',
          url: '/'
        },
        {
          title: 'Contact Us',
          url: '/'
        },
        {
          title: 'Pricing',
          url: '/'
        },
        {
          title: 'Payment',
          url: '/'
        },
        {
          title: 'Landing',
          url: '/'
        }
      ]
    },
    {
      name: 'MainTenance Pages',
      children: [
        {
          title: 'Construction',
          url: '/'
        },
        {
          title: 'Coming Soon',
          url: '/'
        },
        {
          title: '404 Error',
          url: '/'
        }
      ]
    }
  ];

  notifications = [
    {
      avatarClass: 'user-avatar bg-light-success',
      iconClass: 'gift',
      time: '3:00 AM',
      message: "It's <b>Cristina danny's</b> birthday today.",
      date: '2 min ago'
    },
    {
      avatarClass: 'user-avatar bg-light-primary',
      iconClass: 'message',
      time: '6:00 PM',
      message: '<b>Aida Burg</b> commented your post.',
      date: '5 August'
    },
    {
      avatarClass: 'user-avatar bg-light-danger',
      iconClass: 'setting',
      time: '2:45 PM',
      message: 'Your Profile is Complete &nbsp;<b>60%</b>',
      date: '7 hours ago'
    },
    {
      avatarClass: 'user-avatar bg-light-primary',
      iconClass: 'phone',
      time: '9:10 PM',
      message: '<b>Cristina Danny</b> invited to join <b>Meeting.</b>',
      date: 'Daily scrum meeting time'
    }
  ];

  profile = [
    {
      icon: 'edit',
      title: 'Edit Profile'
    },
    {
      icon: 'user',
      title: 'View Profile'
    },
    {
      icon: 'profile',
      title: 'Social Profile'
    },
    {
      icon: 'wallet',
      title: 'Billing'
    }
  ];

  setting = [
    {
      icon: 'question-circle',
      title: 'Support'
    },
    {
      icon: 'user',
      title: 'Account Settings'
    },
    {
      icon: 'lock',
      title: 'Privacy Center'
    },
    {
      icon: 'comment',
      title: 'Feedback'
    },
    {
      icon: 'unordered-list',
      title: 'History'
    }
  ];

  messageList = [
    {
      userImage: 'assets/images/user/avatar-2.jpg',
      timestamp: '3:00 AM',
      boldText: 'Cristina danny birthday today',
      normalText: "It's",
      dateInfo: '2 min ago'
    },
    {
      userImage: 'assets/images/user/avatar-1.jpg',
      timestamp: '6:00 PM',
      boldText: 'Aida Burg',
      normalText: 'commented your post.',
      dateInfo: '5 August'
    },
    {
      userImage: 'assets/images/user/avatar-3.jpg',
      timestamp: '2:45 PM',
      normalText: 'There was a failure to your setup.',
      dateInfo: '7 hours ago'
    },
    {
      userImage: 'assets/images/user/avatar-4.jpg',
      timestamp: '9:10 PM',
      boldText: 'Cristina Danny invited to join Meeting.',
      dateInfo: 'Daily scrum meeting time'
    }
  ];

  customize() {
    this.styleSelectorToggle = !this.styleSelectorToggle;
    this.Customize.emit();
  }

  logout() {
    this.authenticationService.logout();
  }

  // full screen toggle
  toggleFullscreen() {
    this.screenFull = screenfull.isFullscreen;
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }
}
