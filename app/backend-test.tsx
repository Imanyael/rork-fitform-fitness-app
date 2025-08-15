import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { trpc } from '@/lib/trpc';

export default function BackendTestScreen() {
  const hiQuery = trpc.example.hi.useQuery({ name: 'FitForm' });
  const userStatsQuery = trpc.users.stats.useQuery({ userId: 'test-user-123' });
  const workoutsQuery = trpc.workouts.list.useQuery({ userId: 'test-user-123' });

  const createWorkoutMutation = trpc.workouts.create.useMutation({
    onSuccess: (data) => {
      console.log('Workout created:', data);
    },
    onError: (error) => {
      console.error('Error creating workout:', error);
    }
  });

  const handleCreateWorkout = () => {
    createWorkoutMutation.mutate({
      userId: 'test-user-123',
      exerciseName: 'Test Tennis Serve',
      workoutType: 'tennis-serve',
      startedAt: new Date().toISOString(),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Backend Test</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hello Query</Text>
          {hiQuery.isLoading && <Text style={styles.loading}>Loading...</Text>}
          {hiQuery.error && <Text style={styles.error}>Error: {hiQuery.error.message}</Text>}
          {hiQuery.data && (
            <View style={styles.result}>
              <Text style={styles.resultText}>Message: {hiQuery.data.message}</Text>
              <Text style={styles.resultText}>Status: {hiQuery.data.status}</Text>
              <Text style={styles.resultText}>Time: {hiQuery.data.timestamp}</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>User Stats</Text>
          {userStatsQuery.isLoading && <Text style={styles.loading}>Loading...</Text>}
          {userStatsQuery.error && <Text style={styles.error}>Error: {userStatsQuery.error.message}</Text>}
          {userStatsQuery.data && (
            <View style={styles.result}>
              <Text style={styles.resultText}>Total Workouts: {userStatsQuery.data.stats.totalWorkouts}</Text>
              <Text style={styles.resultText}>Avg Form Score: {userStatsQuery.data.stats.averageFormScore}%</Text>
              <Text style={styles.resultText}>Total Minutes: {userStatsQuery.data.stats.totalMinutes}</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Workouts</Text>
          {workoutsQuery.isLoading && <Text style={styles.loading}>Loading...</Text>}
          {workoutsQuery.error && <Text style={styles.error}>Error: {workoutsQuery.error.message}</Text>}
          {workoutsQuery.data && (
            <View style={styles.result}>
              <Text style={styles.resultText}>Total: {workoutsQuery.data.totalCount}</Text>
              {workoutsQuery.data.workouts.map((workout) => (
                <Text key={workout.id} style={styles.resultText}>
                  {workout.exerciseName} - {workout.averageFormScore}%
                </Text>
              ))}
            </View>
          )}
        </View>

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleCreateWorkout}
          disabled={createWorkoutMutation.isPending}
        >
          <Text style={styles.buttonText}>
            {createWorkoutMutation.isPending ? 'Creating...' : 'Create Test Workout'}
          </Text>
        </TouchableOpacity>

        {createWorkoutMutation.data && (
          <View style={styles.result}>
            <Text style={styles.resultText}>Workout Created!</Text>
            <Text style={styles.resultText}>ID: {createWorkoutMutation.data.workout.id}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#1C1C1E',
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  loading: {
    color: '#8E8E93',
    fontStyle: 'italic',
  },
  error: {
    color: '#FF3B30',
  },
  result: {
    marginTop: 10,
  },
  resultText: {
    color: '#FFFFFF',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});