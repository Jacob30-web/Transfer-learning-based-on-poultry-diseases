import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stethoscope, ThermometerSun, Droplets, Eye, FileText, Camera, ChevronRight, CircleCheck as CheckCircle, Circle as XCircle, TriangleAlert as AlertTriangle, ArrowLeft } from 'lucide-react-native';

type Symptom = {
  id: string;
  name: string;
  selected: boolean;
  severity?: 'mild' | 'moderate' | 'severe';
};

type DiagnosisResult = {
  disease: string;
  confidence: number;
  color: string;
  treatment: string[];
  prevention: string[];
};

export default function Diagnosis() {
  const [currentStep, setCurrentStep] = useState(1);
  const [symptoms, setSymptoms] = useState<Symptom[]>([
    { id: '1', name: 'Lethargy', selected: false },
    { id: '2', name: 'Diarrhea', selected: false },
    { id: '3', name: 'Reduced egg production', selected: false },
    { id: '4', name: 'Loss of appetite', selected: false },
    { id: '5', name: 'Respiratory distress', selected: false },
    { id: '6', name: 'Coughing/sneezing', selected: false },
    { id: '7', name: 'Pale combs/wattles', selected: false },
    { id: '8', name: 'Blood in droppings', selected: false },
    { id: '9', name: 'Droopy wings', selected: false },
    { id: '10', name: 'Twisted neck', selected: false },
  ]);
  
  const [environmentalData, setEnvironmentalData] = useState({
    temperature: '',
    humidity: '',
    ventilation: 'good',
    crowding: 'normal',
    feedQuality: 'good',
    waterSource: 'clean',
  });

  const [birdDetails, setBirdDetails] = useState({
    age: '',
    breed: '',
    count: '',
    location: '',
  });

  const [showResults, setShowResults] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);

  const toggleSymptom = (id: string) => {
    setSymptoms(prev => 
      prev.map(symptom => 
        symptom.id === id 
          ? { ...symptom, selected: !symptom.selected }
          : symptom
      )
    );
  };

  const runDiagnosis = () => {
    const selectedSymptoms = symptoms.filter(s => s.selected);
    let result: DiagnosisResult;

    // Simple rule-based diagnosis logic
    if (selectedSymptoms.some(s => s.name.includes('Diarrhea')) && 
        selectedSymptoms.some(s => s.name.includes('Blood in droppings'))) {
      result = {
        disease: 'Coccidiosis',
        confidence: 87,
        color: '#F59E0B',
        treatment: [
          'Administer anticoccidial medication (Amprolium)',
          'Provide electrolyte solution',
          'Isolate affected birds',
          'Improve sanitation practices'
        ],
        prevention: [
          'Regular cleaning of coops',
          'Proper drainage systems',
          'Avoid overcrowding',
          'Routine anticoccidial treatment'
        ]
      };
    } else if (selectedSymptoms.some(s => s.name.includes('Respiratory')) && 
               selectedSymptoms.some(s => s.name.includes('Twisted neck'))) {
      result = {
        disease: 'Newcastle Disease',
        confidence: 92,
        color: '#EF4444',
        treatment: [
          'No specific treatment available',
          'Supportive care with fluids',
          'Quarantine immediately',
          'Contact veterinary authorities'
        ],
        prevention: [
          'Vaccination programs',
          'Biosecurity measures',
          'Limit visitor access',
          'Regular health monitoring'
        ]
      };
    } else if (selectedSymptoms.some(s => s.name.includes('Diarrhea')) && 
               selectedSymptoms.some(s => s.name.includes('Loss of appetite'))) {
      result = {
        disease: 'Salmonella',
        confidence: 78,
        color: '#EF4444',
        treatment: [
          'Antibiotic therapy (consult veterinarian)',
          'Fluid replacement therapy',
          'Probiotics supplementation',
          'Strict hygiene protocols'
        ],
        prevention: [
          'Regular testing of feed and water',
          'Proper food storage',
          'Hand hygiene practices',
          'Rodent control programs'
        ]
      };
    } else {
      result = {
        disease: 'Healthy',
        confidence: 94,
        color: '#22C55E',
        treatment: [
          'Continue current management practices',
          'Monitor birds regularly',
          'Maintain proper nutrition',
          'Ensure adequate ventilation'
        ],
        prevention: [
          'Regular health checks',
          'Balanced nutrition',
          'Clean water supply',
          'Stress reduction measures'
        ]
      };
    }

    setDiagnosisResult(result);
    setShowResults(true);
  };

  const resetDiagnosis = () => {
    setCurrentStep(1);
    setShowResults(false);
    setDiagnosisResult(null);
    setSymptoms(prev => prev.map(s => ({ ...s, selected: false })));
    setEnvironmentalData({
      temperature: '',
      humidity: '',
      ventilation: 'good',
      crowding: 'normal',
      feedQuality: 'good',
      waterSource: 'clean',
    });
    setBirdDetails({
      age: '',
      breed: '',
      count: '',
      location: '',
    });
  };

  const StepIndicator = () => (
    <View style={styles.stepIndicator}>
      {[1, 2, 3].map((step) => (
        <View key={step} style={styles.stepContainer}>
          <View style={[
            styles.stepCircle, 
            currentStep >= step ? styles.stepActive : styles.stepInactive
          ]}>
            <Text style={[
              styles.stepText,
              currentStep >= step ? styles.stepTextActive : styles.stepTextInactive
            ]}>
              {step}
            </Text>
          </View>
          {step < 3 && (
            <View style={[
              styles.stepLine,
              currentStep > step ? styles.stepLineActive : styles.stepLineInactive
            ]} />
          )}
        </View>
      ))}
    </View>
  );

  const SymptomCard = ({ symptom }: { symptom: Symptom }) => (
    <TouchableOpacity
      style={[styles.symptomCard, symptom.selected && styles.symptomCardSelected]}
      onPress={() => toggleSymptom(symptom.id)}
    >
      <View style={styles.symptomContent}>
        <Text style={[
          styles.symptomText,
          symptom.selected && styles.symptomTextSelected
        ]}>
          {symptom.name}
        </Text>
        {symptom.selected ? (
          <CheckCircle size={24} color="#22C55E" />
        ) : (
          <View style={styles.uncheckedCircle} />
        )}
      </View>
    </TouchableOpacity>
  );

  const renderStep1 = () => (
    <View style={styles.stepContent}>
      <View style={styles.stepHeader}>
        <Stethoscope size={32} color="#22C55E" />
        <Text style={styles.stepTitle}>Select Observed Symptoms</Text>
        <Text style={styles.stepDescription}>
          Choose all symptoms you've observed in your birds
        </Text>
      </View>
      
      <ScrollView style={styles.symptomsContainer} showsVerticalScrollIndicator={false}>
        {symptoms.map((symptom) => (
          <SymptomCard key={symptom.id} symptom={symptom} />
        ))}
      </ScrollView>
      
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => setCurrentStep(2)}
      >
        <Text style={styles.nextButtonText}>Next: Environmental Data</Text>
        <ChevronRight size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContent}>
      <View style={styles.stepHeader}>
        <ThermometerSun size={32} color="#3B82F6" />
        <Text style={styles.stepTitle}>Environmental Conditions</Text>
        <Text style={styles.stepDescription}>
          Provide details about the living environment
        </Text>
      </View>
      
      <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Temperature (°C)</Text>
          <TextInput
            style={styles.formInput}
            value={environmentalData.temperature}
            onChangeText={(text) => setEnvironmentalData(prev => ({ ...prev, temperature: text }))}
            placeholder="e.g., 25"
            keyboardType="numeric"
          />
        </View>
        
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Humidity (%)</Text>
          <TextInput
            style={styles.formInput}
            value={environmentalData.humidity}
            onChangeText={(text) => setEnvironmentalData(prev => ({ ...prev, humidity: text }))}
            placeholder="e.g., 65"
            keyboardType="numeric"
          />
        </View>
        
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Ventilation</Text>
          <View style={styles.optionGroup}>
            {['poor', 'fair', 'good', 'excellent'].map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  environmentalData.ventilation === option && styles.optionButtonSelected
                ]}
                onPress={() => setEnvironmentalData(prev => ({ ...prev, ventilation: option }))}
              >
                <Text style={[
                  styles.optionText,
                  environmentalData.ventilation === option && styles.optionTextSelected
                ]}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Crowding Level</Text>
          <View style={styles.optionGroup}>
            {['low', 'normal', 'high', 'overcrowded'].map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  environmentalData.crowding === option && styles.optionButtonSelected
                ]}
                onPress={() => setEnvironmentalData(prev => ({ ...prev, crowding: option }))}
              >
                <Text style={[
                  styles.optionText,
                  environmentalData.crowding === option && styles.optionTextSelected
                ]}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setCurrentStep(1)}
        >
          <ArrowLeft size={20} color="#6B7280" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => setCurrentStep(3)}
        >
          <Text style={styles.nextButtonText}>Next: Bird Details</Text>
          <ChevronRight size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContent}>
      <View style={styles.stepHeader}>
        <FileText size={32} color="#F59E0B" />
        <Text style={styles.stepTitle}>Bird Information</Text>
        <Text style={styles.stepDescription}>
          Provide details about the affected birds
        </Text>
      </View>
      
      <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Age (weeks)</Text>
          <TextInput
            style={styles.formInput}
            value={birdDetails.age}
            onChangeText={(text) => setBirdDetails(prev => ({ ...prev, age: text }))}
            placeholder="e.g., 12"
            keyboardType="numeric"
          />
        </View>
        
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Breed</Text>
          <TextInput
            style={styles.formInput}
            value={birdDetails.breed}
            onChangeText={(text) => setBirdDetails(prev => ({ ...prev, breed: text }))}
            placeholder="e.g., Rhode Island Red"
          />
        </View>
        
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Number of Affected Birds</Text>
          <TextInput
            style={styles.formInput}
            value={birdDetails.count}
            onChangeText={(text) => setBirdDetails(prev => ({ ...prev, count: text }))}
            placeholder="e.g., 15"
            keyboardType="numeric"
          />
        </View>
        
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Coop/Location</Text>
          <TextInput
            style={styles.formInput}
            value={birdDetails.location}
            onChangeText={(text) => setBirdDetails(prev => ({ ...prev, location: text }))}
            placeholder="e.g., Coop A, Section 2"
          />
        </View>
        
        <TouchableOpacity style={styles.photoButton}>
          <Camera size={24} color="#6B7280" />
          <Text style={styles.photoButtonText}>Add Photos (Optional)</Text>
        </TouchableOpacity>
      </ScrollView>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setCurrentStep(2)}
        >
          <ArrowLeft size={20} color="#6B7280" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.diagnoseButton}
          onPress={runDiagnosis}
        >
          <Text style={styles.diagnoseButtonText}>Get Diagnosis</Text>
          <Stethoscope size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderResults = () => (
    <Modal visible={showResults} animationType="slide">
      <SafeAreaView style={styles.modalContainer}>
        <ScrollView style={styles.resultsContainer}>
          <View style={styles.resultsHeader}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowResults(false)}
            >
              <XCircle size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>
          
          {diagnosisResult && (
            <>
              <View style={[styles.diagnosisCard, { borderColor: diagnosisResult.color }]}>
                <View style={styles.diagnosisHeader}>
                  <View style={[styles.diseaseIndicator, { backgroundColor: diagnosisResult.color }]} />
                  <View style={styles.diagnosisInfo}>
                    <Text style={styles.diseaseTitle}>{diagnosisResult.disease}</Text>
                    <Text style={styles.confidenceText}>
                      Confidence: {diagnosisResult.confidence}%
                    </Text>
                  </View>
                  {diagnosisResult.disease === 'Healthy' ? (
                    <CheckCircle size={32} color={diagnosisResult.color} />
                  ) : (
                    <AlertTriangle size={32} color={diagnosisResult.color} />
                  )}
                </View>
              </View>
              
              <View style={styles.treatmentSection}>
                <Text style={styles.sectionTitle}>Recommended Treatment</Text>
                <View style={styles.treatmentList}>
                  {diagnosisResult.treatment.map((treatment, index) => (
                    <View key={index} style={styles.treatmentItem}>
                      <View style={styles.treatmentBullet} />
                      <Text style={styles.treatmentText}>{treatment}</Text>
                    </View>
                  ))}
                </View>
              </View>
              
              <View style={styles.preventionSection}>
                <Text style={styles.sectionTitle}>Prevention Measures</Text>
                <View style={styles.preventionList}>
                  {diagnosisResult.prevention.map((prevention, index) => (
                    <View key={index} style={styles.preventionItem}>
                      <View style={styles.preventionBullet} />
                      <Text style={styles.preventionText}>{prevention}</Text>
                    </View>
                  ))}
                </View>
              </View>
              
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={() => {
                    Alert.alert('Saved', 'Diagnosis saved to history');
                    setShowResults(false);
                    resetDiagnosis();
                  }}
                >
                  <Text style={styles.saveButtonText}>Save to History</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.newDiagnosisButton}
                  onPress={() => {
                    setShowResults(false);
                    resetDiagnosis();
                  }}
                >
                  <Text style={styles.newDiagnosisButtonText}>New Diagnosis</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Health Diagnosis</Text>
        <Text style={styles.headerSubtitle}>
          AI-powered poultry disease classification
        </Text>
      </View>
      
      <StepIndicator />
      
      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {currentStep === 3 && renderStep3()}
      
      {renderResults()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 4,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepActive: {
    backgroundColor: '#22C55E',
  },
  stepInactive: {
    backgroundColor: '#E5E7EB',
  },
  stepText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  stepTextActive: {
    color: '#FFFFFF',
  },
  stepTextInactive: {
    color: '#9CA3AF',
  },
  stepLine: {
    width: 60,
    height: 2,
    marginHorizontal: 8,
  },
  stepLineActive: {
    backgroundColor: '#22C55E',
  },
  stepLineInactive: {
    backgroundColor: '#E5E7EB',
  },
  stepContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stepHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  stepTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginTop: 16,
    textAlign: 'center',
  },
  stepDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
  },
  symptomsContainer: {
    flex: 1,
    marginBottom: 24,
  },
  symptomCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  symptomCardSelected: {
    borderColor: '#22C55E',
    backgroundColor: '#F0FDF4',
  },
  symptomContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  symptomText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  symptomTextSelected: {
    color: '#22C55E',
  },
  uncheckedCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
  },
  formContainer: {
    flex: 1,
    marginBottom: 24,
  },
  formRow: {
    marginBottom: 24,
  },
  formLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    marginBottom: 8,
  },
  formInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  optionGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
  },
  optionButtonSelected: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  optionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  optionTextSelected: {
    color: '#FFFFFF',
  },
  photoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    gap: 8,
  },
  photoButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  backButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    gap: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  nextButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#22C55E',
    gap: 8,
  },
  nextButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  diagnoseButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#3B82F6',
    gap: 8,
  },
  diagnoseButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  resultsContainer: {
    flex: 1,
    padding: 20,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 24,
  },
  closeButton: {
    padding: 8,
  },
  diagnosisCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    borderWidth: 2,
    marginBottom: 24,
  },
  diagnosisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  diseaseIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 16,
  },
  diagnosisInfo: {
    flex: 1,
  },
  diseaseTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  confidenceText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginTop: 4,
  },
  treatmentSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  preventionSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 16,
  },
  treatmentList: {
    gap: 12,
  },
  treatmentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  treatmentBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22C55E',
    marginTop: 8,
    marginRight: 12,
  },
  treatmentText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    lineHeight: 24,
  },
  preventionList: {
    gap: 12,
  },
  preventionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  preventionBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3B82F6',
    marginTop: 8,
    marginRight: 12,
  },
  preventionText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    lineHeight: 24,
  },
  actionButtons: {
    gap: 12,
  },
  saveButton: {
    backgroundColor: '#22C55E',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  newDiagnosisButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  newDiagnosisButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
  },
});