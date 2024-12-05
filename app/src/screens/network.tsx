import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Modal
} from 'react-native';
import { ThemeContext } from '../context';
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

const circles = {
  theOne: {
    name: 'The One',
    bgGradient: ['#9333EA', '#EC4899'],
    contacts: [{ name: 'Sarah', avatar: '/api/placeholder/40/40' }]
  },
  innerCircle: {
    name: 'Inner Circle',
    bgGradient: ['#2563EB', '#60A5FA'],
    contacts: [
      { name: 'John', avatar: '/api/placeholder/40/40' },
      { name: 'Lisa', avatar: '/api/placeholder/40/40' },
      { name: 'Mike', avatar: '/api/placeholder/40/40' },
      { name: 'Emma', avatar: '/api/placeholder/40/40' },
    ]
  },
  closeCircle: {
    name: 'Close Friends',
    bgGradient: ['#60A5FA', '#7DD3FC'],
    contacts: Array(12).fill(null).map((_, i) => ({
      name: `Friend ${i + 1}`,
      avatar: '/api/placeholder/40/40'
    }))
  },
  meaningfulCircle: {
    name: 'Meaningful',
    bgGradient: ['#7DD3FC', '#BAE6FD'],
    contacts: Array(30).fill(null).map((_, i) => ({
      name: `Contact ${i + 1}`,
      avatar: '/api/placeholder/40/40'
    }))
  },
  acquaintances: {
    name: 'Acquaintances',
    bgGradient: ['#BAE6FD', '#E0F2FE'],
    contacts: Array(50).fill(null).map((_, i) => ({
      name: `Acquaintance ${i + 1}`,
      avatar: '/api/placeholder/40/40'
    }))
  }
};

const CircleRing = ({ circle, onPress, isActive, size, zIndex }) => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.ring,
        {
          width: size,
          height: size,
          zIndex,
          backgroundColor: theme.tintColor,
          opacity: isActive ? 0.3 : 0.2,
          transform: [
            { scale: isActive ? 1.1 : 1 }
          ]
        }
      ]}
    >
      <Text style={[styles.ringLabel, { color: theme.textColor }]}>
        {circle.name}
      </Text>
    </TouchableOpacity>
  );
};

const GridView = ({ contacts, onClose, visible }) => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
    >
      <View style={[styles.modalContainer, { backgroundColor: theme.backgroundColor }]}>
        <View style={styles.modalHeader}>
          <Text style={[styles.modalTitle, { color: theme.textColor }]}>
            {contacts?.length} Contacts
          </Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <MaterialIcons
              name="close"
              size={24}
              color={theme.textColor}
            />
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.gridContainer}>
          <View style={styles.grid}>
            {contacts?.map((contact, index) => (
              <View key={index} style={styles.gridItem}>
                <Image
                  source={{ uri: 'https://picsum.photos/200' }}
                  style={styles.avatar}
                />
                <Text style={[styles.contactName, { color: theme.textColor }]}>
                  {contact.name}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export function Network() {
  const [activeCircle, setActiveCircle] = useState(null);
  const [selectedContacts, setSelectedContacts] = useState(null);
  const [gridVisible, setGridVisible] = useState(false);
  const { theme } = useContext(ThemeContext);

  const handleCirclePress = (circleKey) => {
    setActiveCircle(circleKey);
    setSelectedContacts(circles[circleKey].contacts);
    setGridVisible(true);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.circlesContainer}>
        {Object.entries(circles).map(([key, circle], index) => (
          <CircleRing
            key={key}
            circle={circle}
            onPress={() => handleCirclePress(key)}
            isActive={activeCircle === key}
            size={200 + index * 80}
            zIndex={5 - index}
          />
        ))}
        
        {/* Center avatar */}
        <View style={[styles.centerAvatar, { backgroundColor: theme.tintColor }]}>
          <Text style={[styles.centerText, { color: theme.tintTextColor }]}>You</Text>
        </View>
      </View>

      <GridView
        contacts={selectedContacts}
        visible={gridVisible}
        onClose={() => setGridVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  circlesContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    borderRadius: 1000,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringLabel: {
    fontSize: 16,
    fontWeight: '600',
    position: 'absolute',
    bottom: '10%',
  },
  centerAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  centerText: {
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    marginTop: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  closeButton: {
    padding: 5,
  },
  gridContainer: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  gridItem: {
    width: width / 3 - 20,
    margin: 10,
    alignItems: 'center',
  },
  avatar: {
    width: width / 3 - 40,
    height: width / 3 - 40,
    borderRadius: (width / 3 - 40) / 2,
  },
  contactName: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
  },
}); 