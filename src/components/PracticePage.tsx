import { useEffect, useRef, useState } from 'react';
import { Button, Card, Col, InputNumber, Progress, Radio, Row, Space, Typography } from 'antd';
import { TrophyOutlined, CheckCircleOutlined, CloseCircleOutlined, ArrowRightOutlined, BookOutlined } from '@ant-design/icons';
import { chapters } from '../data/curriculum';
import { quests } from '../data/quests';
import { Formula } from './Formula';
import type { ChapterId, QuestQuestion, Language } from '../data/types';

const { Title, Text, Paragraph } = Typography;

interface PracticePageProps {
  language: Language;
}

export function PracticePage({ language }: Readonly<PracticePageProps>) {
  const [activeChapterId, setActiveChapterId] = useState<ChapterId | null>(null);
  const [currentQuestIndex, setCurrentQuestIndex] = useState(0);
  const [userAnswerIndex, setUserAnswerIndex] = useState<number | null>(null);
  const [userNumberAnswer, setUserNumberAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completedQuest, setCompletedQuest] = useState(false);
  const [score, setScore] = useState(0);
  
  // Progress states
  const [completedQuestIds, setCompletedQuestIds] = useState<string[]>([]);
  const [xp, setXp] = useState(0);

  const confettiCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const confettiTimer = useRef<number | null>(null);

  const t = {
    en: {
      title: 'Quest Mode',
      subtitle: 'Apply physics theory to unlock achievements and master baccalaureate topics.',
      xp: 'Total Experience',
      level: 'Level',
      selectChapter: 'Select a Topic to Start a Quest',
      startQuest: 'Start Quest',
      resumeQuest: 'Continue Quest',
      completed: 'Completed',
      questions: 'Questions',
      questProgress: 'Quest Progress',
      submit: 'Check Answer',
      next: 'Next Question',
      congrats: 'Quest Completed!',
      congratsBody: 'Excellent job! You have successfully mastered this quest.',
      xpEarned: 'XP Earned',
      return: 'Return to Dashboard',
      incorrect: 'Incorrect. Check the explanation below:',
      correct: 'Correct! Great job!',
      numericalPlaceholder: 'Enter numerical value',
      retry: 'Retry',
      explanation: 'Explanation',
    },
    ro: {
      title: 'Modul Misiune',
      subtitle: 'Aplică teoria fizicii pentru a debloca realizări și a stăpâni programa de bacalaureat.',
      xp: 'Experiență Totală',
      level: 'Nivel',
      selectChapter: 'Alege o temă pentru a începe o misiune',
      startQuest: 'Începe Misiunea',
      resumeQuest: 'Continuă Misiunea',
      completed: 'Finalizat',
      questions: 'Întrebări',
      questProgress: 'Progres Misiune',
      submit: 'Verifică Răspunsul',
      next: 'Următoarea Întrebare',
      congrats: 'Misiune Finalizată!',
      congratsBody: 'Felicitări! Ai reușit să stăpânești această misiune.',
      xpEarned: 'XP Câștigat',
      return: 'Înapoi la Panou',
      incorrect: 'Incorect. Vezi explicația mai jos:',
      correct: 'Corect! Excelent!',
      numericalPlaceholder: 'Introdu valoarea numerică',
      retry: 'Reîncearcă',
      explanation: 'Explicație',
    },
  }[language];

  // Load progress from localStorage
  useEffect(() => {
    const savedCompleted = localStorage.getItem('feezy_completed_quests');
    const savedXp = localStorage.getItem('feezy_xp');
    if (savedCompleted) {
      setCompletedQuestIds(JSON.parse(savedCompleted));
    }
    if (savedXp) {
      setXp(parseInt(savedXp, 10));
    }
  }, []);

  // Handle saving progress
  const saveProgress = (newCompletedId: string, additionalXp: number) => {
    const updatedIds = [...completedQuestIds];
    if (!updatedIds.includes(newCompletedId)) {
      updatedIds.push(newCompletedId);
    }
    const newXp = xp + additionalXp;
    
    setCompletedQuestIds(updatedIds);
    setXp(newXp);
    
    localStorage.setItem('feezy_completed_quests', JSON.stringify(updatedIds));
    localStorage.setItem('feezy_xp', newXp.toString());
  };

  const activeQuest = quests.find((q) => q.chapterId === activeChapterId);
  const currentQuestion: QuestQuestion | undefined = activeQuest?.questions[currentQuestIndex];

  const handleStartQuest = (chapterId: ChapterId) => {
    setActiveChapterId(chapterId);
    setCurrentQuestIndex(0);
    setUserAnswerIndex(null);
    setUserNumberAnswer(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setCompletedQuest(false);
    setScore(0);
  };

  const checkAnswer = () => {
    if (!currentQuestion) return;
    setIsAnswered(true);

    if (currentQuestion.type === 'multiple-choice') {
      const correct = userAnswerIndex === currentQuestion.correctOptionIndex;
      setIsCorrect(correct);
      if (correct) setScore((s) => s + 100);
    } else {
      if (userNumberAnswer === null) return;
      const target = currentQuestion.correctValue!;
      const tol = currentQuestion.tolerance ?? 0.1;
      const correct = Math.abs(userNumberAnswer - target) <= tol;
      setIsCorrect(correct);
      if (correct) setScore((s) => s + 100);
    }
  };

  const handleNext = () => {
    if (!activeQuest) return;

    if (currentQuestIndex < activeQuest.questions.length - 1) {
      setCurrentQuestIndex((idx) => idx + 1);
      setUserAnswerIndex(null);
      setUserNumberAnswer(null);
      setIsAnswered(false);
      setIsCorrect(false);
    } else {
      // Completed the whole quest
      setCompletedQuest(true);
      if (score > 0) {
        saveProgress(activeQuest.chapterId, score);
      }
      triggerConfetti();
    }
  };

  // Canvas Confetti Celebration Animation
  const triggerConfetti = () => {
    const canvas = confettiCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#7c5cff', '#1fd2b2', '#ff7a59', '#ffd166', '#3b82f6', '#ec4899'];
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      color: string;
      vx: number;
      vy: number;
      rot: number;
      rotSpeed: number;
    }> = [];

    // Initialize 120 confetti pieces
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 80,
        y: canvas.height + 20,
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 15,
        vy: -Math.random() * 15 - 12,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach((p) => {
        // Physics update
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // gravity
        p.vx *= 0.98; // air friction
        p.rot += p.rotSpeed;

        if (p.y < canvas.height + 20) {
          alive = true;
        }

        // Draw rectangle confetti piece
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
        ctx.restore();
      });

      if (alive) {
        confettiTimer.current = requestAnimationFrame(animate);
      }
    };

    animate();
  };

  useEffect(() => {
    return () => {
      if (confettiTimer.current) cancelAnimationFrame(confettiTimer.current);
    };
  }, []);

  const overallLevel = Math.floor(xp / 500) + 1;
  const currentLevelProgress = ((xp % 500) / 500) * 100;

  return (
    <div className="practice-container">
      {/* Confetti Overlay */}
      {completedQuest && (
        <canvas
          ref={confettiCanvasRef}
          style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 9999,
          }}
        />
      )}

      {/* Header Profile Stats */}
      {!activeChapterId && (
        <Card className="profile-dashboard glass-card" style={{ marginBottom: 28 }}>
          <Row align="middle" gutter={[24, 24]}>
            <Col xs={24} sm={6} style={{ textAlign: 'center' }}>
              <TrophyOutlined style={{ fontSize: 56, color: '#ffd166', filter: 'drop-shadow(0 4px 8px rgba(253, 209, 102, 0.4))' }} />
            </Col>
            <Col xs={24} sm={18}>
              <Title level={3} style={{ margin: 0 }}>
                {t.title}
              </Title>
              <Paragraph type="secondary" style={{ margin: '6px 0 16px 0' }}>
                {t.subtitle}
              </Paragraph>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Text type="secondary">{t.level} {overallLevel}</Text>
                  <Progress percent={Math.round(currentLevelProgress)} strokeColor={{ '0%': '#7c5cff', '100%': '#1fd2b2' }} />
                </Col>
                <Col span={12}>
                  <Text type="secondary">{t.xp}</Text>
                  <Title level={4} style={{ margin: 0, color: '#7c5cff' }}>{xp} XP</Title>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      )}

      {/* Main dashboard / Quest select */}
      {!activeChapterId ? (
        <div className="chapter-quest-grid">
          <Title level={4} style={{ marginBottom: 20, textAlign: 'center' }}>{t.selectChapter}</Title>
          <Row gutter={[20, 20]}>
            {chapters.map((chapter) => {
              const hasCompleted = completedQuestIds.includes(chapter.id);
              const chapterQuest = quests.find((q) => q.chapterId === chapter.id);
              const questionCount = chapterQuest?.questions.length ?? 0;

              return (
                <Col xs={24} sm={12} md={8} key={chapter.id}>
                  <Card
                    hoverable
                    className={`quest-chapter-card glass-card ${hasCompleted ? 'completed-accent' : ''}`}
                    actions={[
                      <Button
                        type={hasCompleted ? 'default' : 'primary'}
                        icon={<ArrowRightOutlined />}
                        onClick={() => handleStartQuest(chapter.id)}
                        key="start"
                        style={{ width: '85%' }}
                      >
                        {hasCompleted ? t.resumeQuest : t.startQuest}
                      </Button>
                    ]}
                  >
                    <div className="quest-header">
                      <BookOutlined style={{ fontSize: 24, color: '#7c5cff', marginBottom: 12 }} />
                      {hasCompleted && (
                        <span className="quest-completed-badge" style={{ float: 'right', color: '#1fd2b2', fontWeight: 600 }}>
                          <CheckCircleOutlined /> {t.completed}
                        </span>
                      )}
                    </div>
                    <Title level={4} style={{ marginTop: 0 }}>
                      {chapter.title[language]}
                    </Title>
                    <Paragraph type="secondary" ellipsis={{ rows: 2 }}>
                      {chapter.summary[language]}
                    </Paragraph>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {questionCount} {t.questions} | +{questionCount * 100} XP
                    </Text>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      ) : (
        /* Quest Runner Screen */
        <div className="quest-runner">
          {completedQuest ? (
            <Card className="congrats-card glass-card" style={{ textAlign: 'center', padding: '40px 20px' }}>
              <TrophyOutlined style={{ fontSize: 72, color: '#ffd166', marginBottom: 20 }} />
              <Title level={2}>{t.congrats}</Title>
              <Paragraph style={{ fontSize: 16 }}>{t.congratsBody}</Paragraph>
              <Title level={4} style={{ color: '#1fd2b2', margin: '20px 0' }}>
                +{score} {t.xpEarned}
              </Title>
              <Button type="primary" size="large" onClick={() => setActiveChapterId(null)}>
                {t.return}
              </Button>
            </Card>
          ) : (
            currentQuestion && (
              <Card
                className="quest-question-card glass-card"
                title={`${t.questProgress}: ${currentQuestIndex + 1} / ${activeQuest?.questions.length}`}
                extra={<Button onClick={() => setActiveChapterId(null)} size="small">{t.return}</Button>}
              >
                <div style={{ marginBottom: 16 }}>
                  <Progress
                    percent={((currentQuestIndex) / activeQuest!.questions.length) * 100}
                    showInfo={false}
                    strokeColor="#7c5cff"
                  />
                </div>

                <div className="quest-question-body" style={{ margin: '28px 0' }}>
                  <Title level={4}>
                    <Formula math={currentQuestion.question[language]} />
                  </Title>
                </div>

                <div className="quest-input-section" style={{ marginBottom: 28 }}>
                  {currentQuestion.type === 'multiple-choice' ? (
                    <Space direction="vertical" style={{ width: '100%' }}>
                      {currentQuestion.options?.[language].map((opt, idx) => {
                        const isSelected = userAnswerIndex === idx;
                        let btnClass = 'quiz-option-button';
                        if (isAnswered) {
                          if (idx === currentQuestion.correctOptionIndex) {
                            btnClass += ' correct-btn';
                          } else if (isSelected) {
                            btnClass += ' incorrect-btn';
                          }
                        } else if (isSelected) {
                          btnClass += ' selected-btn';
                        }

                        return (
                          <Button
                            key={opt}
                            className={btnClass}
                            onClick={() => setUserAnswerIndex(idx)}
                            disabled={isAnswered}
                            style={{
                              width: '100%',
                              textAlign: 'left',
                              height: 'auto',
                              padding: '12px 18px',
                              lineHeight: '1.4',
                              borderRadius: '10px',
                              marginBottom: '6px',
                              display: 'block',
                              whiteSpace: 'normal',
                            }}
                          >
                            {opt}
                          </Button>
                        );
                      })}
                    </Space>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <InputNumber
                        placeholder={t.numericalPlaceholder}
                        value={userNumberAnswer}
                        onChange={setUserNumberAnswer}
                        disabled={isAnswered}
                        style={{ width: 220, height: 40, fontSize: 16, display: 'flex', alignItems: 'center' }}
                      />
                      {currentQuestion.unit && (
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{currentQuestion.unit}</Text>
                      )}
                    </div>
                  )}
                </div>

                {isAnswered && (
                  <Card
                    style={{
                      background: isCorrect ? 'rgba(31, 210, 178, 0.08)' : 'rgba(239, 68, 68, 0.08)',
                      borderColor: isCorrect ? 'rgba(31, 210, 178, 0.3)' : 'rgba(239, 68, 68, 0.3)',
                      marginBottom: 24,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                      {isCorrect ? (
                        <CheckCircleOutlined style={{ color: '#1fd2b2', fontSize: 20 }} />
                      ) : (
                        <CloseCircleOutlined style={{ color: '#ef4444', fontSize: 20 }} />
                      )}
                      <Text strong style={{ fontSize: 15 }}>
                        {isCorrect ? t.correct : t.incorrect}
                      </Text>
                    </div>
                    
                    <div style={{ marginTop: 12 }}>
                      <Text strong>{t.explanation}:</Text>
                      <div className="explanation-latex-block" style={{ marginTop: 8 }}>
                        <Formula math={currentQuestion.explanation[language]} />
                      </div>
                    </div>
                  </Card>
                )}

                <div className="quest-actions">
                  {!isAnswered ? (
                    <Button
                      type="primary"
                      size="large"
                      onClick={checkAnswer}
                      disabled={
                        currentQuestion.type === 'multiple-choice'
                          ? userAnswerIndex === null
                          : userNumberAnswer === null
                      }
                    >
                      {t.submit}
                    </Button>
                  ) : (
                    <Button type="primary" size="large" onClick={handleNext} icon={<ArrowRightOutlined />}>
                      {t.next}
                    </Button>
                  )}
                </div>
              </Card>
            )
          )}
        </div>
      )}
    </div>
  );
}
