import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { hiragana, katakana, basicKanji } from './src/data/japanese';
import {
  getTotalCharactersLearned,
  getQuizAccuracy,
  getStudyStreak,
  getModuleProgress,
} from './src/lib/progress';
import { getTranslation, Language, LANGUAGES } from './src/lib/translations';

type Screen = 'dashboard' | 'hiragana' | 'katakana' | 'kanji' | 'progress';

export default function App() {
  const [screen, setScreen] = useState<Screen>('dashboard');
  const [language, setLanguage] = useState<Language>('en');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCharacters: 0,
    quizAccuracy: 0,
    studyStreak: 0,
  });

  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    loadPreferences();
  }, []);

  useEffect(() => {
    if (screen === 'dashboard' || screen === 'progress') {
      loadStats();
    }
  }, [screen]);

  const loadPreferences = async () => {
    try {
      const saved = await AsyncStorage.getItem('preferred-language');
      if (saved && saved in LANGUAGES) {
        setLanguage(saved as Language);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    const total = await getTotalCharactersLearned();
    const accuracy = await getQuizAccuracy();
    const streak = await getStudyStreak();
    setStats({
      totalCharacters: total,
      quizAccuracy: accuracy,
      studyStreak: streak,
    });
  };

  const changeLanguage = async (lang: Language) => {
    setLanguage(lang);
    await AsyncStorage.setItem('preferred-language', lang);
  };

  const t = (key: string) => getTranslation(language, key);

  const colors = {
    bg: isDark ? '#1a1a1a' : '#ffffff',
    text: isDark ? '#ffffff' : '#000000',
    secondary: isDark ? '#cccccc' : '#666666',
    card: isDark ? '#2a2a2a' : '#f5f5f5',
    primary: '#0066cc',
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  const renderDashboard = () => (
    <ScrollView style={styles.content}>
      <Text style={[styles.title, { color: colors.text }]}>NiSen</Text>
      <Text style={[styles.subtitle, { color: colors.secondary }]}>
        Nihongo Sensei
      </Text>

      <View style={[styles.statsContainer, { backgroundColor: colors.card }]}>
        <StatBox
          label={t('Characters Learned')}
          value={stats.totalCharacters.toString()}
          colors={colors}
        />
        <StatBox
          label={t('Quiz Accuracy')}
          value={stats.quizAccuracy > 0 ? `${stats.quizAccuracy}%` : '--'}
          colors={colors}
        />
        <StatBox
          label={t('Study Streak')}
          value={stats.studyStreak.toString()}
          colors={colors}
        />
      </View>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Modules
      </Text>

      <ModuleButton
        title={t('Hiragana')}
        icon="hiragana"
        onPress={() => setScreen('hiragana')}
        colors={colors}
      />
      <ModuleButton
        title={t('Katakana')}
        icon="katakana"
        onPress={() => setScreen('katakana')}
        colors={colors}
      />
      <ModuleButton
        title={t('Kanji')}
        icon="kanji"
        onPress={() => setScreen('kanji')}
        colors={colors}
      />

      <ModuleButton
        title={t('Progress')}
        icon="chart-line"
        onPress={() => setScreen('progress')}
        colors={colors}
      />
    </ScrollView>
  );

  const renderCharacterGrid = (characters: any[], title: string) => (
    <ScrollView style={styles.content}>
      <TouchableOpacity
        onPress={() => setScreen('dashboard')}
        style={styles.backButton}
      >
        <MaterialCommunityIcons
          name="arrow-left"
          size={24}
          color={colors.primary}
        />
        <Text style={[styles.backText, { color: colors.primary }]}>
          {t('Back')}
        </Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>

      <View style={styles.grid}>
        {characters.map((char, idx) => (
          <View
            key={idx}
            style={[styles.gridItem, { backgroundColor: colors.card }]}
          >
            <Text style={[styles.gridCharacter, { color: colors.text }]}>
              {char.character}
            </Text>
            <Text style={[styles.gridRomaji, { color: colors.secondary }]}>
              {char.romaji}
            </Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.quizButton, { backgroundColor: colors.primary }]}
        onPress={() => {}}
      >
        <Text style={styles.quizButtonText}>{t('Start Quiz')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderProgress = () => (
    <ScrollView style={styles.content}>
      <TouchableOpacity
        onPress={() => setScreen('dashboard')}
        style={styles.backButton}
      >
        <MaterialCommunityIcons
          name="arrow-left"
          size={24}
          color={colors.primary}
        />
        <Text style={[styles.backText, { color: colors.primary }]}>
          {t('Back')}
        </Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color: colors.text }]}>
        {t('Progress')}
      </Text>

      <View style={[styles.statsContainer, { backgroundColor: colors.card }]}>
        <StatBox
          label={t('Characters Learned')}
          value={stats.totalCharacters.toString()}
          colors={colors}
        />
        <StatBox
          label={t('Quiz Accuracy')}
          value={stats.quizAccuracy > 0 ? `${stats.quizAccuracy}%` : '--'}
          colors={colors}
        />
        <StatBox
          label={t('Study Streak')}
          value={stats.studyStreak.toString()}
          colors={colors}
        />
      </View>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Module Progress
      </Text>
      {['Hiragana', 'Katakana', 'Kanji'].map((module, idx) => (
        <View key={idx} style={styles.progressItem}>
          <Text style={[styles.progressLabel, { color: colors.text }]}>
            {module}
          </Text>
          <View style={[styles.progressBar, { backgroundColor: colors.card }]}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${Math.random() * 100}%`,
                  backgroundColor: colors.primary,
                },
              ]}
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.card,
            borderBottomColor: colors.secondary,
          },
        ]}
      >
        <Text style={[styles.headerTitle, { color: colors.text }]}>NiSen</Text>
        <View style={styles.headerControls}>
          <TouchableOpacity style={styles.languageButton}>
            <MaterialCommunityIcons
              name="globe"
              size={24}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Language Menu */}
      <View style={styles.languageMenuContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.languageMenu}
        >
          {(Object.entries(LANGUAGES) as [Language, string][]).map(
            ([lang, name]) => (
              <TouchableOpacity
                key={lang}
                onPress={() => changeLanguage(lang)}
                style={[
                  styles.languageOption,
                  {
                    backgroundColor:
                      language === lang ? colors.primary : colors.card,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.languageOptionText,
                    {
                      color: language === lang ? '#fff' : colors.text,
                    },
                  ]}
                >
                  {name}
                </Text>
              </TouchableOpacity>
            )
          )}
        </ScrollView>
      </View>

      {screen === 'dashboard' && renderDashboard()}
      {screen === 'hiragana' && renderCharacterGrid(hiragana, 'Hiragana')}
      {screen === 'katakana' && renderCharacterGrid(katakana, 'Katakana')}
      {screen === 'kanji' && renderCharacterGrid(basicKanji, 'Kanji')}
      {screen === 'progress' && renderProgress()}
    </SafeAreaView>
  );
}

function StatBox({
  label,
  value,
  colors,
}: {
  label: string;
  value: string;
  colors: any;
}) {
  return (
    <View style={styles.statBox}>
      <Text style={[styles.statValue, { color: colors.primary }]}>
        {value}
      </Text>
      <Text style={[styles.statLabel, { color: colors.secondary }]}>
        {label}
      </Text>
    </View>
  );
}

function ModuleButton({
  title,
  icon,
  onPress,
  colors,
}: {
  title: string;
  icon: string;
  onPress: () => void;
  colors: any;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.moduleButton,
        { backgroundColor: colors.card, borderColor: colors.primary },
      ]}
    >
      <MaterialCommunityIcons
        name={icon as any}
        size={24}
        color={colors.primary}
      />
      <Text style={[styles.moduleButtonText, { color: colors.text }]}>
        {title}
      </Text>
      <MaterialCommunityIcons
        name="chevron-right"
        size={24}
        color={colors.secondary}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerControls: {
    flexDirection: 'row',
    gap: 12,
  },
  languageButton: {
    padding: 8,
  },
  languageMenuContainer: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  languageMenu: {
    flexDirection: 'row',
  },
  languageOption: {
    marginHorizontal: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  languageOptionText: {
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 12,
  },
  statsContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  moduleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  moduleButtonText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  gridItem: {
    width: '23%',
    aspectRatio: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridCharacter: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  gridRomaji: {
    fontSize: 12,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  quizButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24,
  },
  quizButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  progressItem: {
    marginBottom: 16,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
});
