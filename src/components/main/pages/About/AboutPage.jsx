import React from 'react';
import styled from 'styled-components';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useTheme } from '../../../contexts/ThemeContext';

const lightTheme = {
  bgColor: '#fdf0e4',
  textColor: '#323232',
  accentColor: '#f8d4b5',
  neonColor: '#443532',
  neonGradient: 'linear-gradient(45deg, #ff62bbc5, #f8d4b5, #ffe4d3)',
  neonGlow: '0 0 10px #ff62bbc5, 0 0 20px #f8d4b5, 0 0 30px #ffe4d3'
};

const darkTheme = {
  bgColor: '#383838',
  textColor: '#f0f0f0',
  accentColor: '#4a4a4a',
  neonColor: '#00efefe5',
  neonGradient: 'linear-gradient(45deg, #00c7c7, #00efef, #70ffc1)',
  neonGlow: '0 0 10px #00c7c7, 0 0 20px #00efef, 0 0 30px #70ffc1'
};

const AboutContainer = styled.div`
  max-width: 1200px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 2rem;
  background-color: ${props => props.theme.bgColor};
  color: ${props => props.theme.textColor};
  min-height: 80vh;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  background: ${props => props.theme.neonColor};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ContentSection = styled.section`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: ${props => props.theme.accentColor};
  border-radius: 8px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h2 {
    color: ${props => props.theme.neonColor};
    margin-bottom: 1rem;
  }

  p {
    line-height: 1.6;
  }
`;

const ContactInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
  background-color: ${props => props.theme.accentColor};
  border-radius: 8px;
  margin-top: 2rem;

  .contact-item {
    padding: 1rem;
    text-align: center;
    border-radius: 4px;
    background-color: ${props => props.theme.bgColor};
  }
`;

const AboutPage = () => {
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();

  const content = {
    uk: {
      title: "Про нас",
      mission: {
        title: "Наша місія",
        text: "Наша місія - забезпечити найкращий догляд за вашими улюбленцями через якісні товари та професійні поради. Ми прагнемо зробити життя домашніх тварин щасливішим, а їхніх власників - спокійнішими.",
      },
      history: {
        title: "Наша історія",
        text: "Заснована у 2222 році, наша компанія пройшла довгий шлях від маленького магазину до провідного постачальника товарів для домашніх тварин. Ми пишаємося тим, що допомогли тисячам сімей забезпечити найкраще для їхніх улюбленців.",
      },
      values: {
        title: "Наші цінності",
        text: "Якість, турбота та відповідальність - основні принципи нашої роботи. Ми ретельно відбираємо продукцію та співпрацюємо лише з перевіреними виробниками.",
      },
      contact: {
        title: "Контакти",
        address: "Адреса: вул. 68 Десантників, 10, Миколаїв",
        phone: "Телефон: +380 00 123 45 67",
        email: "Email: 4DomesticPawStore@gmail.ua"
      }
    },
    en: {
      title: "About Us",
      mission: {
        title: "Our Mission",
        text: "Our mission is to provide the best care for your pets through quality products and professional advice. We strive to make pets' lives happier and their owners more peaceful.",
      },
      history: {
        title: "Our History",
        text: "Founded in 2222, our company has come a long way from a small shop to a leading pet supplies provider. We are proud to have helped thousands of families provide the best for their pets.",
      },
      values: {
        title: "Our Values",
        text: "Quality, care, and responsibility are the core principles of our work. We carefully select products and work only with verified manufacturers.",
      },
      contact: {
        title: "Contact Information",
        address: "Address: St. 68 Paratroopers, 10, Mykolaiv",
        phone: "Phone: +380 00 123 45 67",
        email: "Email: 4DomesticPawStore@gmail.ua"
      }
    }
  };

  const currentContent = content[language];
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <AboutContainer theme={theme}>
      <Title theme={theme}>{currentContent.title}</Title>
      
      <ContentSection theme={theme}>
        <h2>{currentContent.mission.title}</h2>
        <p>{currentContent.mission.text}</p>
      </ContentSection>

      <ContentSection theme={theme}>
        <h2>{currentContent.history.title}</h2>
        <p>{currentContent.history.text}</p>
      </ContentSection>

      <ContentSection theme={theme}>
        <h2>{currentContent.values.title}</h2>
        <p>{currentContent.values.text}</p>
      </ContentSection>

      <ContactInfo theme={theme}>
        <div className="contact-item">
          <p>{currentContent.contact.address}</p>
        </div>
        <div className="contact-item">
          <p>{currentContent.contact.phone}</p>
        </div>
        <div className="contact-item">
          <p>{currentContent.contact.email}</p>
        </div>
      </ContactInfo>
    </AboutContainer>
  );
};

export default AboutPage;