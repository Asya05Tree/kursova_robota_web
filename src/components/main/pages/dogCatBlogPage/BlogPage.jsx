import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import blogStyles from './BlogPage.module.css';
import { Typography, Divider } from 'antd';

const Title = Typography;

const DogBlogPage = () => {
  const { isDarkMode } = useTheme();

  const blogSections = [
    {
      title: "Почуття страху розлуки у собак",
      content: "Як допомогти собаці подолати тривогу розлуки та зробити її більш впевненою.",
      image: "https://static6.depositphotos.com/1006610/663/i/450/depositphotos_6634839-stock-photo-australian-shepherd-aussie-puppy-watching.jpg"
    },
    {
      title: "Вибір собаки",
      content: "Поради щодо вибору породи, віку та темпераменту собаки відповідно до вашого способу життя.",
      image: "https://st.depositphotos.com/1007630/2727/i/450/depositphotos_27276047-stock-photo-portrait-of-two-young-beauty.jpg"
    },
    {
      title: "Вигул собаки",
      content: "Правила та рекомендації щодо регулярного вигулу вашого улюбленця.",
      image: "https://kartinki.pics/pics/uploads/posts/2022-08/1660673102_1-kartinkin-net-p-oboi-na-rabochii-stol-sobaki-krasivo-1.jpg"
    },
  ];

  const additionalSections = [
    {
      title: "Годування собаки",
      content: "Рекомендації щодо здорового харчування та режиму годування."
    },
    {
      title: "Дресирування собаки",
      content: "Основні команди та методи ефективного навчання."
    },
    {
      title: "Хвороба собаки",
      content: "Розпізнавання симптомів та профілактика захворювань."
    },
    {
      title: "Перша допомога собаці",
      content: "Що робити в екстрених ситуаціях та необхідні навички."
    }
  ];

  return (
    <div className={`${blogStyles['blog-container']} ${isDarkMode ? blogStyles['dark-theme'] : blogStyles['light-theme']}`}>
      <Title level={1} className={blogStyles['text-center'] + ' ' + blogStyles['mb-8']}></Title>
      <div className={blogStyles['blog-grid']}>
        {blogSections.map((section, index) => (
          <div key={index} className={blogStyles['blog-card']}>
            <img src={section.image} alt={section.title} className={blogStyles['card-image']} />
            <div className={blogStyles['card-content']}>
              <h3 className={blogStyles['card-title']}>{section.title}</h3>
              <p className={blogStyles['card-description']}>{section.content}</p>
            </div>
          </div>
        ))}
      </div>

      <Divider />

      <div className={blogStyles['additional-sections']}>
        {additionalSections.map((section, index) => (
          <div key={index} className={blogStyles['blog-card']}>
            <div className={blogStyles['card-content']}>
              <h3 className={blogStyles['card-title']}>{section.title}</h3>
              <p className={blogStyles['card-description']}>{section.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CatBlogPage = () => {
  const { isDarkMode } = useTheme();

  const blogSections = [
    {
      title: "Аптечка першої допомоги для кішки",
      content: "Необхідні медикаменти та засоби для домашньої аптечки вашого улюбленця.",
      image: "https://images.pexels.com/photos/4062842/pexels-photo-4062842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Хвороби у котів",
      content: "Поширені захворювання, їх симптоми та методи лікування.",
      image: "https://images.pexels.com/photos/1265618/pexels-photo-1265618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Вакцинація котів",
      content: "Важливість вакцинації та графік необхідних щеплень.",
      image: "https://images.pexels.com/photos/160755/kittens-cats-foster-playing-160755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
  ];

  const additionalSections = [
    {
      title: "Гігієнічний догляд котів",
      content: "Поради щодо регулярного догляду за шерстю та гігієною."
    },
    {
      title: "Небажана вагітність у кішки",
      content: "Профілактика та рекомендації щодо стерилізації."
    },
    {
      title: "Як привчити кошеня до туалету",
      content: "Покрокова інструкція та корисні поради."
    }
  ];

  return (
    <div className={`${blogStyles['blog-container']} ${isDarkMode ? blogStyles['dark-theme'] : blogStyles['light-theme']}`}>
      <Title level={1} className={blogStyles['text-center'] + ' ' + blogStyles['mb-8']}></Title>
      <div className={blogStyles['blog-grid']}>
        {blogSections.map((section, index) => (
          <div key={index} className={blogStyles['blog-card']}>
            <img src={section.image} alt={section.title} className={blogStyles['card-image']} />
            <div className={blogStyles['card-content']}>
              <h3 className={blogStyles['card-title']}>{section.title}</h3>
              <p className={blogStyles['card-description']}>{section.content}</p>
            </div>
          </div>
        ))}
      </div>

      <Divider />

      <div className={blogStyles['additional-sections']}>
        {additionalSections.map((section, index) => (
          <div key={index} className={blogStyles['blog-card']}>
            <div className={blogStyles['card-content']}>
              <h3 className={blogStyles['card-title']}>{section.title}</h3>
              <p className={blogStyles['card-description']}>{section.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { DogBlogPage, CatBlogPage };