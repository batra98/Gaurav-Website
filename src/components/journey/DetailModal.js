import React from 'react';
import styled from 'styled-components';
import { theme, media } from '@styles';

const { colors, fontSizes, fonts } = theme;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${colors.navy}e6;
  backdrop-filter: blur(10px);
  z-index: 2000;
  opacity: ${props => props.isOpen ? 1 : 0};
  pointer-events: ${props => props.isOpen ? 'all' : 'none'};
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow-y: auto;
`;

const Modal = styled.div`
  background: linear-gradient(135deg, ${colors.lightNavy}98 0%, ${colors.navy}95 100%);
  backdrop-filter: blur(20px);
  border: 2px solid ${colors.green}40;
  border-radius: 20px;
  max-width: 700px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 40px;
  position: relative;
  transform: ${props => props.isOpen ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(20px)'};
  opacity: ${props => props.isOpen ? 1 : 0};
  transition: all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
  box-shadow: 0 20px 80px ${colors.shadowNavy};
  
  ${media.tablet`
    padding: 30px 24px;
    max-height: 85vh;
  `};
  
  ${media.phone`
    padding: 24px 20px;
    border-radius: 16px;
  `};
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${colors.navy};
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${colors.lightestNavy};
    border-radius: 4px;
    
    &:hover {
      background: ${colors.green}50;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${colors.lightNavy};
  border: 1px solid ${colors.lightestNavy};
  color: ${colors.slate};
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
  
  &:hover {
    background: ${colors.green}20;
    color: ${colors.green};
    border-color: ${colors.green};
    transform: rotate(90deg);
  }
`;

const Header = styled.div`
  margin-bottom: 24px;
`;

const TypeBadge = styled.span`
  display: inline-block;
  padding: 6px 14px;
  background: ${colors.gradient};
  border-radius: 20px;
  font-size: ${fontSizes.xs};
  font-family: ${fonts.SFMono};
  color: ${colors.navy};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
`;

const CompanyLogoLarge = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 12px;
  object-fit: contain;
  background: white;
  padding: 12px;
  border: 1px solid ${colors.lightestNavy}40;
  margin-bottom: 16px;
`;

const Icon = styled.div`
  font-size: 56px;
  margin-bottom: 16px;
  line-height: 1;
`;

const Title = styled.h2`
  font-size: ${fontSizes.h3};
  color: ${colors.lightestSlate};
  margin: 0 0 8px 0;
  font-weight: 600;
  
  ${media.phone`
    font-size: ${fontSizes.xxl};
  `};
`;

const Role = styled.h3`
  font-size: ${fontSizes.lg};
  color: ${colors.slate};
  margin: 0 0 16px 0;
  font-weight: 400;
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
  font-size: ${fontSizes.sm};
  color: ${colors.slate};
  font-family: ${fonts.SFMono};
`;

const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: ${colors.green}20;
  border: 1px solid ${colors.green}60;
  border-radius: 20px;
  color: ${colors.green};
  font-size: ${fontSizes.xs};
  font-family: ${fonts.SFMono};
  margin-bottom: 16px;
  
  &:before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${colors.green};
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

const Description = styled.p`
  color: ${colors.lightSlate};
  font-size: ${fontSizes.md};
  line-height: 1.7;
  margin: 20px 0;
`;

const Section = styled.div`
  margin: 28px 0;
`;

const SectionTitle = styled.h4`
  color: ${colors.green};
  font-size: ${fontSizes.md};
  margin: 0 0 16px 0;
  font-family: ${fonts.SFMono};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AchievementList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 10px;
`;

const Achievement = styled.li`
  padding: 12px 16px 12px 32px;
  position: relative;
  color: ${colors.lightSlate};
  font-size: ${fontSizes.sm};
  line-height: 1.6;
  background: ${colors.navy}40;
  border-radius: 8px;
  border-left: 3px solid ${colors.green};
  transition: all 0.2s ease;
  
  &:hover {
    background: ${colors.navy}60;
    transform: translateX(4px);
  }
  
  &:before {
    content: '▹';
    position: absolute;
    left: 12px;
    color: ${colors.green};
    font-size: ${fontSizes.lg};
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const TechPill = styled.span`
  padding: 8px 14px;
  background: ${colors.lightNavy};
  border: 1px solid ${colors.lightestNavy}50;
  border-radius: 8px;
  font-size: ${fontSizes.sm};
  font-family: ${fonts.SFMono};
  color: ${colors.lightSlate};
  transition: all 0.3s ease;
  
  &:hover {
    background: ${colors.lightNavy}cc;
    border-color: ${colors.green}80;
    color: ${colors.green};
    transform: translateY(-2px);
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 20px;
`;

const MetricCard = styled.div`
  padding: 20px;
  background: ${colors.navy}60;
  border: 1px solid ${colors.lightestNavy}40;
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${colors.green}60;
    transform: translateY(-4px);
    box-shadow: 0 8px 24px ${colors.green}20;
  }
`;

const MetricValue = styled.div`
  font-size: ${fontSizes.xxl};
  font-weight: 700;
  background: ${colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
`;

const MetricLabel = styled.div`
  font-size: ${fontSizes.sm};
  color: ${colors.slate};
  font-family: ${fonts.SFMono};
`;

const WebsiteLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  padding: 12px 24px;
  background: transparent;
  border: 2px solid ${colors.green};
  border-radius: 8px;
  color: ${colors.green};
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.sm};
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${colors.green}20;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px ${colors.green}30;
  }
`;

const Navigation = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid ${colors.lightestNavy}30;
`;

const NavButton = styled.button`
  flex: 1;
  padding: 14px 24px;
  background: ${colors.lightNavy};
  border: 1px solid ${colors.lightestNavy}50;
  border-radius: 10px;
  color: ${colors.lightestSlate};
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.sm};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background: ${colors.green}20;
    border-color: ${colors.green}80;
    color: ${colors.green};
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const DetailModal = ({ location, isOpen, onClose, onNext, onPrev, hasNext, hasPrev }) => {
  if (!location) return null;

  return (
    <Overlay isOpen={isOpen} onClick={onClose}>
      <Modal isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        
        <Header>
          <TypeBadge>{location.type}</TypeBadge>
          {location.logo ? (
            <CompanyLogoLarge 
              src={location.logo} 
              alt={location.title}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
          ) : (
            <Icon>{location.icon}</Icon>
          )}
          {location.logo && <Icon style={{ display: 'none' }}>{location.icon}</Icon>}
          <Title>{location.title}</Title>
          <Role>{location.role}</Role>
          <Meta>
            <span>{location.location}</span>
            <span>{location.year}</span>
          </Meta>

          {location.current && (
            <StatusBadge>Currently here</StatusBadge>
          )}
        </Header>

        <Description>{location.description}</Description>

        {location.metrics && (
          <MetricsGrid>
            <MetricCard>
              <MetricValue>{location.metrics.duration}</MetricValue>
              <MetricLabel>Duration</MetricLabel>
            </MetricCard>
            <MetricCard>
              <MetricValue>{location.metrics.achievement}</MetricValue>
              <MetricLabel>Key Achievement</MetricLabel>
            </MetricCard>
          </MetricsGrid>
        )}

        {location.achievements && location.achievements.length > 0 && (
          <Section>
            <SectionTitle>Key Achievements</SectionTitle>
            <AchievementList>
              {location.achievements.map((achievement, idx) => (
                <Achievement key={idx}>{achievement}</Achievement>
              ))}
            </AchievementList>
          </Section>
        )}

        {location.techStack && location.techStack.length > 0 && (
          <Section>
            <SectionTitle>Technologies</SectionTitle>
            <TechStack>
              {location.techStack.map((tech, idx) => (
                <TechPill key={idx}>{tech}</TechPill>
              ))}
            </TechStack>
          </Section>
        )}

        {location.website && (
          <WebsiteLink href={location.website} target="_blank" rel="noopener noreferrer">
            Visit Website →
          </WebsiteLink>
        )}

        <Navigation>
          <NavButton onClick={onPrev} disabled={!hasPrev}>
            ← Previous
          </NavButton>
          <NavButton onClick={onNext} disabled={!hasNext}>
            Next →
          </NavButton>
        </Navigation>
      </Modal>
    </Overlay>
  );
};

export default DetailModal;
