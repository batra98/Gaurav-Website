import React, { useState, useEffect } from 'react';
import { Layout } from '@components';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { theme, media } from '@styles';
import journeyData, { journeyStats } from '../data/journeyData';
import JourneyTimeline from '../components/journey/JourneyTimeline';
import MiniMap from '../components/journey/MiniMap';
import DetailModal from '../components/journey/DetailModal';

const { colors, fontSizes, fonts } = theme;

const JourneyContainer = styled.main`
  min-height: 100vh;
  padding: 100px 0 50px;
  
  ${media.tablet`padding: 150px 0 50px;`};
`;

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 50px;
  
  ${media.desktop`padding: 0 40px;`};
  ${media.tablet`padding: 0 25px;`};
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${colors.green};
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.sm};
  margin-bottom: 40px;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateX(-4px);
  }
`;

const Hero = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const Title = styled.h1`
  font-size: 60px;
  background: ${colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 16px 0;
  
  ${media.desktop`font-size: 50px;`};
  ${media.tablet`font-size: 40px;`};
  ${media.phone`font-size: 32px;`};
`;

const Subtitle = styled.p`
  font-size: ${fontSizes.xl};
  color: ${colors.slate};
  margin: 0 0 40px 0;
  
  ${media.tablet`font-size: ${fontSizes.lg};`};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
  max-width: 900px;
  margin: 0 auto 60px;
  
  ${media.tablet`grid-template-columns: repeat(2, 1fr);`};
  ${media.phone`grid-template-columns: 1fr;`};
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, ${colors.lightNavy}60 0%, ${colors.lightNavy}40 100%);
  backdrop-filter: blur(10px);
  border: 1px solid ${colors.lightestNavy}30;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${colors.green}50;
    transform: translateY(-4px);
    box-shadow: 0 8px 24px ${colors.green}20;
  }
`;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  background: ${colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  font-size: ${fontSizes.sm};
  color: ${colors.slate};
  font-family: ${fonts.SFMono};
`;

const HybridLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 500px;
  gap: 60px;
  margin-top: 60px;
  align-items: start;
  
  ${media.bigDesktop`
    grid-template-columns: 1fr 450px;
    gap: 50px;
  `};
  
  ${media.desktop`
    grid-template-columns: 1fr 400px;
    gap: 40px;
  `};
  
  ${media.tablet`
    grid-template-columns: 1fr;
    gap: 40px;
  `};
`;

const TimelineSection = styled.div`
  min-height: 100vh;
`;

const MapSection = styled.div`
  ${media.tablet`
    order: -1;
  `};
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: ${fontSizes.h3};
  color: ${colors.lightestSlate};
  margin-bottom: 12px;
  
  ${media.tablet`
    font-size: ${fontSizes.xxl};
  `};
`;

const SectionDescription = styled.p`
  font-size: ${fontSizes.md};
  color: ${colors.slate};
  font-family: ${fonts.SFMono};
  max-width: 600px;
  margin: 0 auto;
  
  ${media.phone`
    font-size: ${fontSizes.sm};
  `};
`;

const JourneyPage = ({ location }) => {
  const [activeItem, setActiveItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleItemClick = (item) => {
    setActiveItem(item);
    setDetailModalOpen(true);
  };

  const handleItemHover = (item) => {
    setHoveredItem(item);
  };

  const handleLocationClick = (item) => {
    setActiveItem(item);
    // Scroll to the item in timeline
    const element = document.querySelector(`[data-timeline-item][data-index="${journeyData.findIndex(d => d.id === item.id)}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleClose = () => {
    setDetailModalOpen(false);
  };

  const handleNext = () => {
    const currentIndex = journeyData.findIndex(l => l.id === activeItem?.id);
    if (currentIndex < journeyData.length - 1) {
      setActiveItem(journeyData[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    const currentIndex = journeyData.findIndex(l => l.id === activeItem?.id);
    if (currentIndex > 0) {
      setActiveItem(journeyData[currentIndex - 1]);
    }
  };

  const currentIndex = journeyData.findIndex(l => l.id === activeItem?.id);
  const hasNext = currentIndex < journeyData.length - 1;
  const hasPrev = currentIndex > 0;

  const displayItem = hoveredItem || activeItem;

  return (
    <Layout location={location}>
      <JourneyContainer>
        <ContentWrapper>
          <BackLink to="/">← Back to Home</BackLink>

          <Hero>
            <Title>My Journey</Title>
            <Subtitle>From Hyderabad to San Francisco</Subtitle>

            <StatsGrid>
              <StatCard>
                <StatValue>{journeyStats.cities}</StatValue>
                <StatLabel>Cities</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{journeyStats.yearsExperience}</StatValue>
                <StatLabel>Years Experience</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{journeyStats.microservices}+</StatValue>
                <StatLabel>Microservices</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{journeyStats.publications}</StatValue>
                <StatLabel>Publication</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>$250k</StatValue>
                <StatLabel>ARR Impact</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{journeyStats.performanceImprovement}%</StatValue>
                <StatLabel>Performance Gain</StatLabel>
              </StatCard>
            </StatsGrid>
          </Hero>

          <SectionHeader>
            <SectionTitle>Professional Timeline</SectionTitle>
            <SectionDescription>
              Follow my career journey through education, research, and industry roles
            </SectionDescription>
          </SectionHeader>

          <HybridLayout>
            <TimelineSection>
              <JourneyTimeline
                data={journeyData}
                activeItem={displayItem}
                onItemClick={handleItemClick}
                onItemHover={handleItemHover}
              />
            </TimelineSection>

            {isMounted && (
              <MapSection>
                <MiniMap
                  data={journeyData}
                  activeLocation={displayItem}
                  onLocationClick={handleLocationClick}
                />
              </MapSection>
            )}
          </HybridLayout>
        </ContentWrapper>

        <DetailModal
          location={activeItem}
          isOpen={detailModalOpen}
          onClose={handleClose}
          onNext={handleNext}
          onPrev={handlePrev}
          hasNext={hasNext}
          hasPrev={hasPrev}
        />
      </JourneyContainer>
    </Layout>
  );
};

export default JourneyPage;
