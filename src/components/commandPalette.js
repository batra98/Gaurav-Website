import React, { useState, useEffect, useRef } from 'react';
import { navigate } from 'gatsby';
import styled from 'styled-components';
import { theme } from '@styles';
const { colors, fonts, fontSizes } = theme;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${colors.shadowNavy};
  backdrop-filter: blur(10px);
  z-index: 10000;
  display: ${props => (props.isOpen ? 'flex' : 'none')};
  align-items: flex-start;
  justify-content: center;
  padding-top: 15vh;
  animation: fadeIn 0.2s ease;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const PaletteContainer = styled.div`
  width: 90%;
  max-width: 640px;
  background: linear-gradient(135deg, ${colors.lightNavy}98 0%, ${colors.navy}95 100%);
  backdrop-filter: blur(20px);
  border: 1px solid ${colors.green}30;
  border-radius: 12px;
  box-shadow: 0 20px 60px ${colors.shadowNavy}, 0 0 0 1px ${colors.green}15;
  overflow: hidden;
  animation: slideDown 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  
  @keyframes slideDown {
    from { 
      opacity: 0;
      transform: translateY(-20px) scale(0.95);
    }
    to { 
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 24px;
  background: transparent;
  border: none;
  border-bottom: 1px solid ${colors.lightestNavy}30;
  color: ${colors.lightestSlate};
  font-size: ${fontSizes.xl};
  font-family: ${fonts.Calibre};
  font-weight: 500;
  outline: none;
  
  &::placeholder {
    color: ${colors.slate};
    font-weight: 400;
  }
`;

const ResultsList = styled.div`
  max-height: 420px;
  overflow-y: auto;
  padding: 12px;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${colors.navy};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${colors.lightestNavy};
    border-radius: 4px;
    
    &:hover {
      background: ${colors.green}50;
    }
  }
`;

const ResultItem = styled.div`
  padding: 14px 16px;
  margin: 4px 0;
  background: ${props => (props.isSelected ? colors.lightNavy : 'transparent')};
  border: 1px solid ${props => (props.isSelected ? `${colors.green}40` : 'transparent')};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  display: flex;
  align-items: center;
  gap: 14px;
  
  &:hover {
    background: ${colors.lightNavy};
    border-color: ${colors.green}40;
    transform: translateX(2px);
  }
`;

const ResultIcon = styled.span`
  font-size: 22px;
  min-width: 24px;
  line-height: 1;
`;

const ResultContent = styled.div`
  flex: 1;
`;

const ResultTitle = styled.div`
  color: ${colors.lightestSlate};
  font-size: ${fontSizes.lg};
  font-weight: 500;
  font-family: ${fonts.Calibre};
  margin-bottom: 2px;
`;

const ResultSubtitle = styled.div`
  color: ${colors.slate};
  font-size: ${fontSizes.sm};
  font-family: ${fonts.Calibre};
`;

const Footer = styled.div`
  padding: 14px 24px;
  border-top: 1px solid ${colors.lightestNavy}30;
  display: flex;
  gap: 20px;
  font-size: ${fontSizes.sm};
  color: ${colors.slate};
  font-family: ${fonts.SFMono};
  background: ${colors.navy}50;
`;

const Kbd = styled.kbd`
  background: ${colors.lightestNavy}40;
  padding: 4px 10px;
  border-radius: 4px;
  border: 1px solid ${colors.lightestNavy}50;
  color: ${colors.lightestSlate};
  font-size: ${fontSizes.xs};
  font-family: ${fonts.SFMono};
  font-weight: 500;
`;

// Search data
const SEARCH_DATA = [
  { id: 'about', title: 'About Me', subtitle: 'Learn about my background', icon: '👤', path: '/#about' },
  { id: 'experience', title: 'Experience', subtitle: 'My work history', icon: '💼', path: '/#jobs' },
  { id: 'projects', title: 'Projects', subtitle: 'Things I\'ve built', icon: '🚀', path: '/#projects' },
  { id: 'contact', title: 'Contact', subtitle: 'Get in touch', icon: '📧', path: '/#contact' },
  { id: 'blog', title: 'Blog', subtitle: 'My thoughts and writings', icon: '📝', path: '/pensieve' },
  { id: 'resume', title: 'Resume', subtitle: 'Download my CV', icon: '📄', path: '/resume.pdf', external: true },
  { id: 'github', title: 'GitHub', subtitle: 'Check out my code', icon: '💻', path: 'https://github.com/batra98', external: true },
  { id: 'linkedin', title: 'LinkedIn', subtitle: 'Connect with me', icon: '🔗', path: 'https://www.linkedin.com/in/gaurav-batra-363084176/', external: true },
];

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  // Filter results based on query
  const results = query
    ? SEARCH_DATA.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(query.toLowerCase())
      )
    : SEARCH_DATA;

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Open palette: Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }

      // Close palette: Escape
      if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
        setSelectedIndex(0);
      }

      // Navigate results
      if (isOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % results.length);
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
        }
        if (e.key === 'Enter') {
          e.preventDefault();
          handleSelect(results[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (item) => {
    if (item.external) {
      window.open(item.path, '_blank');
    } else if (item.path.startsWith('/#')) {
      setIsOpen(false);
      const element = document.querySelector(item.path.replace('/', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(item.path);
      setIsOpen(false);
    }
    setQuery('');
    setSelectedIndex(0);
  };

  if (!isOpen) return null;

  return (
    <Overlay isOpen={isOpen} onClick={() => setIsOpen(false)}>
      <PaletteContainer onClick={(e) => e.stopPropagation()}>
        <SearchInput
          ref={inputRef}
          type="text"
          placeholder="Search for anything... (projects, experience, contact)"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedIndex(0);
          }}
        />
        
        <ResultsList>
          {results.length > 0 ? (
            results.map((item, index) => (
              <ResultItem
                key={item.id}
                isSelected={index === selectedIndex}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setSelectedIndex(index)}>
                <ResultIcon>{item.icon}</ResultIcon>
                <ResultContent>
                  <ResultTitle>{item.title}</ResultTitle>
                  <ResultSubtitle>{item.subtitle}</ResultSubtitle>
                </ResultContent>
              </ResultItem>
            ))
          ) : (
            <ResultItem>
              <ResultIcon>🔍</ResultIcon>
              <ResultContent>
                <ResultTitle>No results found</ResultTitle>
                <ResultSubtitle>Try a different search term</ResultSubtitle>
              </ResultContent>
            </ResultItem>
          )}
        </ResultsList>
        
        <Footer>
          <span><Kbd>↑</Kbd> <Kbd>↓</Kbd> Navigate</span>
          <span><Kbd>Enter</Kbd> Select</span>
          <span><Kbd>Esc</Kbd> Close</span>
        </Footer>
      </PaletteContainer>
    </Overlay>
  );
};

export default CommandPalette;