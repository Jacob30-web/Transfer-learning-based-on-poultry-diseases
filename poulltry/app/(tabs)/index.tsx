import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Image 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TriangleAlert as AlertTriangle, TrendingUp, Shield, Activity, ChevronRight, Bell } from 'lucide-react-native';
import { router } from 'expo-router';

export default function Dashboard() {
  const healthStats = {
    totalBirds: 2847,
    healthyBirds: 2720,
    alertsToday: 3,
    weeklyTrend: '+5.2%'
  };

  const recentAlerts = [
    {
      id: 1,
      type: 'warning',
      message: 'Unusual mortality rate in Coop B',
      time: '2 hours ago',
      severity: 'medium'
    },
    {
      id: 2,
      type: 'info',
      message: 'Vaccination due for Coop A',
      time: '4 hours ago',
      severity: 'low'
    },
    {
      id: 3,
      type: 'alert',
      message: 'Temperature spike detected',
      time: '6 hours ago',
      severity: 'high'
    }
  ];

  const StatCard = ({ title, value, icon: Icon, color, subtitle }: any) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <View style={styles.statHeader}>
        <Icon size={24} color={color} />
        <Text style={styles.statValue}>{value}</Text>
      </View>
      <Text style={styles.statTitle}>{title}</Text>
      {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
    </View>
  );

  const AlertItem = ({ alert }: any) => (
    <TouchableOpacity style={styles.alertItem}>
      <View style={[styles.alertIndicator, { 
        backgroundColor: alert.severity === 'high' ? '#EF4444' : 
                          alert.severity === 'medium' ? '#F59E0B' : '#3B82F6' 
      }]} />
      <View style={styles.alertContent}>
        <Text style={styles.alertMessage}>{alert.message}</Text>
        <Text style={styles.alertTime}>{alert.time}</Text>
      </View>
      <ChevronRight size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning</Text>
            <Text style={styles.farmName}>Green Valley Farm</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color="#374151" />
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Farm Image */}
        <View style={styles.farmImageContainer}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/6875125/pexels-photo-6875125.jpeg?auto=compress&cs=tinysrgb&w=800' }}
            style={styles.farmImage}
          />
          <View style={styles.farmOverlay}>
            <Text style={styles.farmOverlayText}>
              Farm Health Status: Good
            </Text>
          </View>
        </View>

        {/* Health Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Overview</Text>
          <View style={styles.statsGrid}>
            <StatCard 
              title="Total Birds"
              value={healthStats.totalBirds.toLocaleString()}
              icon={Activity}
              color="#22C55E"
            />
            <StatCard 
              title="Healthy Birds"
              value={healthStats.healthyBirds.toLocaleString()}
              icon={Shield}
              color="#3B82F6"
              subtitle={`${((healthStats.healthyBirds / healthStats.totalBirds) * 100).toFixed(1)}%`}
            />
            <StatCard 
              title="Active Alerts"
              value={healthStats.alertsToday}
              icon={AlertTriangle}
              color="#F59E0B"
            />
            <StatCard 
              title="Weekly Trend"
              value={healthStats.weeklyTrend}
              icon={TrendingUp}
              color="#22C55E"
              subtitle="Health improvement"
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: '#22C55E' }]}
              onPress={() => router.push('/diagnosis')}
            >
              <Stethoscope size={24} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>New Diagnosis</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: '#3B82F6' }]}
              onPress={() => router.push('/history')}
            >
              <History size={24} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>View History</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Alerts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Alerts</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.alertsList}>
            {recentAlerts.map((alert) => (
              <AlertItem key={alert.id} alert={alert} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Import the missing components
import { History, Stethoscope } from 'lucide-react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  greeting: {
    fontSize: 16,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  farmName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Inter-Bold',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
  farmImageContainer: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  farmImage: {
    width: '100%',
    height: 200,
  },
  farmOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 16,
  },
  farmOverlayText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
    fontFamily: 'Inter-SemiBold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    color: '#22C55E',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    flex: 1,
    minWidth: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    fontFamily: 'Inter-Bold',
  },
  statTitle: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Medium',
  },
  statSubtitle: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
    fontFamily: 'Inter-Regular',
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    gap: 8,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  alertsList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  alertIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  alertContent: {
    flex: 1,
  },
  alertMessage: {
    fontSize: 16,
    color: '#111827',
    fontFamily: 'Inter-Medium',
    marginBottom: 4,
  },
  alertTime: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
});