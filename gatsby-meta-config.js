module.exports = {
  title: `sbbs.me`,
  description: `sb의 개발일기`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://sbbs.me`,
  ogImage: `/og-image.png`, // Path to your in the 'static' folder
  comments: {
    utterances: {
      repo: ``, // `zoomkoding/zoomkoding-gatsby-blog`,
    },
  },
  author: {
    name: `이수빈`,
    bio: {
      role: `개발자`,
      description: ['사람에 가치를 두는', '능동적으로 일하는', '재밌는 것을 만드는'],
      thumbnail: 'sb.png', // Path to the image in the 'asset' folder
    },
    social: {
      github: `https://github.com/leesoobin`, // `https://github.com/zoomKoding`,
      linkedIn: `https://www.linkedin.com/in/soobin-lee-57099b210`, // `https://www.linkedin.com/in/jinhyeok-jeong-800871192`,
      email: `s-b@kakao.com`, // `zoomkoding@gmail.com`,
    },
  },

  // metadata for About Page
  about: {
    timestamps: [
      // =====       [Timestamp Sample and Structure]      =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!) =====
      {
        date: '',
        activity: '',
        links: {
          github: '',
          post: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        date: '2016.10 ~ ',
        activity: '다날 시스템운영팀 (네트워크어드민 & 보안개발)',
      },
      {
        date: '2019.10 ~',
        activity: '카카오뱅크 시스템보안팀 (취약점점검 & 보안개발)',
      },
    ],

    projects: [
      // =====        [Project Sample and Structure]        =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!)  =====
      {
        title: '',
        description: '',
        techStack: ['', ''],
        thumbnailUrl: '',
        links: {
          post: '',
          github: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        title: '스타트업 개발 기획',
        description:
          '아이디어를 현실로 만들기 위해 스타트업 개발기획자로 참여하게 되었습니다. 좋은 경험이였습니다',
        techStack: ['notion'],
        thumbnailUrl: 'feather.png',
      },
      {
        title: '카페24 쇼핑몰 개발',
        description:
          '15년전 고등학생 시절 카페24 쇼핑몰을 만든 추억을 되새기며 쇼핑몰 외주구축을 즐겁게 만들었습니다',
        techStack: ['html', 'css'],
        thumbnailUrl: 'pg1.png',
      },
      {
        title: '개발 블로그 오픈',
        description:
          '개발하는 프로젝트들을 정리하고, 경험과 노력을 기록하기 위해 블로그를 만들게 되었습니다',
        techStack: ['gatsby', 'react'],
        thumbnailUrl: 'blog.png',
      }
    ],
  },
};
