import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { theme, media } from '@styles';

const { colors, fontSizes, fonts } = theme;

const TimelineContainer = styled.div`
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 0;
`;

const TimelineLine = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, 
    transparent 0%,
    ${colors.green}40 10%,
    ${colors.green}40 90%,
    transparent 100%
  );
  transform: translateX(-50%);
  
  ${media.tablet`
    left: 30px;
  `};
`;

const TimelineProgress = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  width: 2px;
  background: linear-gradient(180deg, ${colors.green} 0%, ${colors.purple} 100%);
  transform: translateX(-50%);
  transition: height 0.3s ease;
  box-shadow: 0 0 20px ${colors.green}60;
  
  ${media.tablet`
    left: 30px;
  `};
`;

const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 80px;
  opacity: ${props => props.isVisible ? 1 : 0};
  transform: translateY(${props => props.isVisible ? '0' : '30px'});
  transition: all 0.6s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-delay: ${props => props.index * 0.1}s;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  ${media.tablet`
    margin-bottom: 60px;
  `};
`;

const TimelineContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  
  ${media.tablet`
    grid-template-columns: 1fr;
    gap: 20px;
    padding-left: 70px;
  `};
`;

const TimelineCard = styled.div`
  grid-column: ${props => props.side === 'left' ? '1' : '2'};
  background: linear-gradient(135deg, ${colors.lightNavy}95 0%, ${colors.navy}90 100%);
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.isActive ? colors.green : colors.lightestNavy}40;
  border-radius: 16px;
  padding: 32px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  box-shadow: ${props => props.isActive 
    ? `0 12px 40px ${colors.green}30, 0 0 0 2px ${colors.green}40`
    : `0 8px 24px ${colors.shadowNavy}`};
  position: relative;
  
  &:hover {
    border-color: ${colors.green}60;
    transform: translateY(-4px);
    box-shadow: 0 12px 40px ${colors.green}20;
  }
  
  &:before {
    content: '';
    position: absolute;
    ${props => props.side === 'left' ? 'right: -31px' : 'left: -31px'};
    top: 50%;
    transform: translateY(-50%);
    width: 60px;
    height: 2px;
    background: ${props => props.isActive ? colors.green : colors.lightestNavy}40;
    transition: all 0.3s ease;
  }
  
  ${media.tablet`
    grid-column: 1;
    
    &:before {
      left: -60px;
      width: 50px;
    }
  `};
`;

const TimelineDot = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${props => props.isActive ? colors.gradient : colors.navy};
  border: 3px solid ${props => props.isActive ? colors.green : colors.lightestNavy}60;
  box-shadow: ${props => props.isActive 
    ? `0 0 0 8px ${colors.green}20, 0 0 20px ${colors.green}60` 
    : 'none'};
  z-index: 10;
  transition: all 0.3s ease;
  
  ${media.tablet`
    left: 30px;
  `};
`;

const CompanyHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const CompanyLogo = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: contain;
  background: white;
  padding: 8px;
  border: 1px solid ${colors.lightestNavy}40;
`;

const IconContainer = styled.div`
  font-size: 48px;
  line-height: 1;
  display: inline-block;
  animation: ${props => props.isActive ? 'bounce 1s ease' : 'none'};
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
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

const CardTitle = styled.h3`
  font-size: ${fontSizes.xxl};
  color: ${colors.lightestSlate};
  margin: 0 0 8px 0;
  font-weight: 600;
  
  ${media.phone`
    font-size: ${fontSizes.xl};
  `};
`;

const CardRole = styled.h4`
  font-size: ${fontSizes.md};
  color: ${colors.slate};
  margin: 0 0 16px 0;
  font-weight: 400;
`;

const CardMeta = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  font-size: ${fontSizes.sm};
  color: ${colors.slate};
  font-family: ${fonts.SFMono};
  flex-wrap: wrap;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CardDescription = styled.p`
  color: ${colors.lightSlate};
  font-size: ${fontSizes.sm};
  line-height: 1.6;
  margin: 16px 0;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid ${colors.lightestNavy}30;
`;

const Metric = styled.div`
  text-align: center;
  padding: 12px;
  background: ${colors.navy}60;
  border-radius: 8px;
  border: 1px solid ${colors.lightestNavy}30;
`;

const MetricValue = styled.div`
  font-size: ${fontSizes.lg};
  font-weight: 700;
  background: ${colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 4px;
`;

const MetricLabel = styled.div`
  font-size: ${fontSizes.xs};
  color: ${colors.slate};
  font-family: ${fonts.SFMono};
`;

const AchievementPreview = styled.div`
  margin-top: 12px;
  padding: 12px;
  background: ${colors.navy}40;
  border-left: 3px solid ${colors.green};
  border-radius: 4px;
  font-size: ${fontSizes.sm};
  color: ${colors.lightSlate};
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
  margin-top: 12px;
  
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

const ExpandButton = styled.button`
  margin-top: 16px;
  padding: 10px 20px;
  background: transparent;
  border: 1px solid ${colors.green}40;
  border-radius: 8px;
  color: ${colors.green};
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.sm};
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  
  &:hover {
    background: ${colors.green}20;
    border-color: ${colors.green};
  }
`;

const JourneyTimeline = ({ data, activeItem, onItemClick, onItemHover }) => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);
  const observerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Intersection Observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set([...prev, entry.target.dataset.index]));
          }
        });
      },
      { threshold: 0.2 }
    );

    const items = document.querySelectorAll('[data-timeline-item]');
    items.forEach(item => observerRef.current.observe(item));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [data]);

  useEffect(() => {
    // Calculate scroll progress for timeline line animation
    const handleScroll = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const progress = Math.max(0, Math.min(1, 
          (windowHeight - rect.top) / (rect.height + windowHeight)
        ));
        setScrollProgress(progress * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <TimelineContainer ref={containerRef}>
      <TimelineLine />
      <TimelineProgress style={{ height: `${scrollProgress}%` }} />
      
      {data.map((item, index) => {
        const isActive = activeItem?.id === item.id;
        const side = index % 2 === 0 ? 'left' : 'right';
        const isVisible = visibleItems.has(String(index));
        
        return (
          <TimelineItem
            key={item.id}
            data-timeline-item
            data-index={index}
            index={index}
            isVisible={isVisible}
          >
            <TimelineDot isActive={isActive} />
            <TimelineContent>
              <TimelineCard
                side={side}
                isActive={isActive}
                onClick={() => onItemClick(item)}
                onMouseEnter={() => onItemHover?.(item)}
              >
                <TypeBadge>{item.type}</TypeBadge>
                <CompanyHeader>
                  {item.logo ? (
                    <CompanyLogo src={item.logo} alt={item.title} onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'inline-block';
                    }} />
                  ) : (
                    <IconContainer isActive={isActive}>{item.icon}</IconContainer>
                  )}
                  {item.logo && <IconContainer isActive={isActive} style={{ display: 'none' }}>{item.icon}</IconContainer>}
                </CompanyHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardRole>{item.role}</CardRole>
                
                <CardMeta>
                  <MetaItem>{item.location}</MetaItem>
                  <MetaItem>{item.year}</MetaItem>
                </CardMeta>

                {item.current && (
                  <StatusBadge>Currently here</StatusBadge>
                )}
                
                {item.upcoming && (
                  <StatusBadge>Upcoming - Summer 2025</StatusBadge>
                )}
                
                <CardDescription>{item.description}</CardDescription>
                
                {item.achievements && item.achievements.length > 0 && (
                  <AchievementPreview>
                    {item.achievements[0]}
                    {item.achievements.length > 1 && ` (+${item.achievements.length - 1} more)`}
                  </AchievementPreview>
                )}

                {item.metrics && (
                  <MetricsGrid>
                    <Metric>
                      <MetricValue>{item.metrics.duration}</MetricValue>
                      <MetricLabel>Duration</MetricLabel>
                    </Metric>
                    <Metric>
                      <MetricValue>{item.metrics.achievement}</MetricValue>
                      <MetricLabel>Impact</MetricLabel>
                    </Metric>
                  </MetricsGrid>
                )}

                {item.achievements && item.achievements.length > 1 && (
                  <ExpandButton onClick={(e) => {
                    e.stopPropagation();
                    onItemClick(item);
                  }}>
                    View Full Details →
                  </ExpandButton>
                )}
              </TimelineCard>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </TimelineContainer>
  );
};

export default JourneyTimeline;
