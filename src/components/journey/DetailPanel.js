import React from 'react';
import styled from 'styled-components';
import { theme } from '@styles';

const Panel = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 450px;
  height: 100vh;
  background: linear-gradient(135deg, ${props => props.theme.colors.lightNavy}98 0%, ${props => props.theme.colors.navy}95 100%);
  backdrop-filter: blur(20px);
  border-left: 1px solid ${props => props.theme.colors.green}30;
  box-shadow: -20px 0 60px ${props => props.theme.colors.shadowNavy};
  transform: translateX(${props => (props.isOpen ? '0' : '100%')});
  transition: transform 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
  z-index: 1000;
  overflow-y: auto;
  padding: 40px;
  
  @media (max-width: 968px) {
    width: 100%;
    height: auto;
    max-height: 70vh;
    top: auto;
    bottom: 0;
    border-left: none;
    border-top: 1px solid ${props => props.theme.colors.green}30;
    border-radius: 20px 20px 0 0;
    transform: translateY(${props => (props.isOpen ? '0' : '100%')});
  }
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.navy};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.lightestNavy};
    border-radius: 4px;
    
    &:hover {
      background: ${props => props.theme.colors.green}50;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${props => props.theme.colors.lightNavy};
  border: 1px solid ${props => props.theme.colors.lightestNavy};
  color: ${props => props.theme.colors.slate};
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme.colors.green}20;
    color: ${props => props.theme.colors.green};
    border-color: ${props => props.theme.colors.green};
    transform: rotate(90deg);
  }
`;

const TypeBadge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  background: ${props => props.theme.colors.gradient};
  border-radius: 12px;
  font-size: ${props => props.theme.fontSizes.xs};
  font-family: ${props => props.theme.fonts.SFMono};
  color: ${props => props.theme.colors.navy};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Icon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  line-height: 1;
`;

const Title = styled.h2`
  font-size: ${props => props.theme.fontSizes.h3};
  color: ${props => props.theme.colors.lightestSlate};
  margin: 12px 0 8px 0;
  font-weight: 600;
`;

const Role = styled.h3`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.slate};
  margin: 0 0 8px 0;
  font-weight: 400;
`;

const Meta = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.slate};
  font-family: ${props => props.theme.fonts.SFMono};
`;

const Description = styled.p`
  color: ${props => props.theme.colors.lightSlate};
  font-size: ${props => props.theme.fontSizes.md};
  line-height: 1.6;
  margin: 20px 0;
`;

const SectionTitle = styled.h4`
  color: ${props => props.theme.colors.green};
  font-size: ${props => props.theme.fontSizes.md};
  margin: 24px 0 12px 0;
  font-family: ${props => props.theme.fonts.SFMono};
  font-weight: 600;
`;

const AchievementList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Achievement = styled.li`
  padding: 8px 0 8px 24px;
  position: relative;
  color: ${props => props.theme.colors.lightSlate};
  font-size: ${props => props.theme.fontSizes.sm};
  line-height: 1.5;
  
  &:before {
    content: '▹';
    position: absolute;
    left: 0;
    color: ${props => props.theme.colors.green};
    font-size: ${props => props.theme.fontSizes.lg};
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`;

const TechPill = styled.span`
  padding: 6px 12px;
  background: ${props => props.theme.colors.lightNavy};
  border: 1px solid ${props => props.theme.colors.lightestNavy}40;
  border-radius: 6px;
  font-size: ${props => props.theme.fontSizes.xs};
  font-family: ${props => props.theme.fonts.SFMono};
  color: ${props => props.theme.colors.slate};
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.theme.colors.lightNavy}80;
    border-color: ${props => props.theme.colors.green}60;
    color: ${props => props.theme.colors.green};
    transform: translateY(-2px);
  }
`;

const Navigation = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid ${props => props.theme.colors.lightestNavy}30;
`;

const NavButton = styled.button`
  flex: 1;
  padding: 12px 20px;
  background: ${props => props.theme.colors.lightNavy};
  border: 1px solid ${props => props.theme.colors.lightestNavy}40;
  border-radius: 8px;
  color: ${props => props.theme.colors.lightestSlate};
  font-family: ${props => props.theme.fonts.SFMono};
  font-size: ${props => props.theme.fontSizes.sm};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.green}20;
    border-color: ${props => props.theme.colors.green}60;
    color: ${props => props.theme.colors.green};
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const WebsiteLink = styled.a`
  display: inline-block;
  margin-top: 16px;
  padding: 10px 20px;
  background: transparent;
  border: 1px solid ${props => props.theme.colors.green};
  border-radius: 6px;
  color: ${props => props.theme.colors.green};
  font-family: ${props => props.theme.fonts.SFMono};
  font-size: ${props => props.theme.fontSizes.sm};
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.green}20;
    transform: translateY(-2px);
  }
`;

const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: ${props => props.theme.colors.green}20;
  border: 1px solid ${props => props.theme.colors.green}60;
  border-radius: 20px;
  color: ${props => props.theme.colors.green};
  font-size: ${props => props.theme.fontSizes.xs};
  font-family: ${props => props.theme.fonts.SFMono};
  margin-top: 12px;
  
  &:before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${props => props.theme.colors.green};
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

const DetailPanel = ({ location, isOpen, onClose, onNext, onPrev, hasNext, hasPrev }) => {
  if (!location) return null;

  return (
    <Panel isOpen={isOpen}>
      <CloseButton onClick={onClose}>×</CloseButton>
      
      <TypeBadge>{location.type}</TypeBadge>
      <Icon>{location.icon}</Icon>
      <Title>{location.title}</Title>
      <Role>{location.role}</Role>
      <Meta>
        <span>📍 {location.location}</span>
        <span>📅 {location.year}</span>
      </Meta>

      {location.current && (
        <StatusBadge>Currently here</StatusBadge>
      )}
      
      {location.upcoming && (
        <StatusBadge>Upcoming - Summer 2025</StatusBadge>
      )}

      <Description>{location.description}</Description>

      {location.achievements && location.achievements.length > 0 && (
        <>
          <SectionTitle>✨ Key Achievements</SectionTitle>
          <AchievementList>
            {location.achievements.map((achievement, idx) => (
              <Achievement key={idx}>{achievement}</Achievement>
            ))}
          </AchievementList>
        </>
      )}

      {location.techStack && location.techStack.length > 0 && (
        <>
          <SectionTitle>💻 Technologies</SectionTitle>
          <TechStack>
            {location.techStack.map((tech, idx) => (
              <TechPill key={idx}>{tech}</TechPill>
            ))}
          </TechStack>
        </>
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
    </Panel>
  );
};

export default JourneyMap;
export { DetailPanel };