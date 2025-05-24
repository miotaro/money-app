import { defineStore, storeToRefs } from 'pinia'
import { ref, computed, onMounted } from 'vue'
import { useFormatDateStore } from './formatDateStore'
import { addRecordToFirestore } from "@/composables/useFirestore"
import { deleteRecordFromFirestore } from "@/composables/useFirestore"
import { fetchRecordsFromFirestore } from "@/composables/useFirestore"
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export const useRecordStore = defineStore('record', () => {
  const amount = ref('')
  const today = new Date().toISOString().split('T')[0] //2025-05-01の形式
  const date = ref(today)
  const category = ref('')
  const memo = ref('')
  const amountType = ref(true) //trueは支出、falseは収入  
  const records = ref([])

  const uid = getAuth().currentUser?.uid

  onMounted(() => {
    onAuthStateChanged(getAuth(), async (user) => {
      if (user) {
        const fetchedRecords = await fetchRecordsFromFirestore(user.uid)
        records.value = fetchedRecords
      } else {
        console.warn("未ログインです。データは取得されません。")
        records.value = []
      }
    })
  })
  
  const recordsByDate = computed(() => {
    const grouped = {}
    for (const record of records.value) {
      if (!grouped[record.date]) {
        grouped[record.date] = []
      }
      grouped[record.date].push(record)
    }
    return grouped
  })
  const recordsByDateSorted = computed(() => {
    return Object.fromEntries(
      Object.entries(recordsByDate.value).sort((a, b) => b[0].localeCompare(a[0]))
    )
  })

  const addRecord = async (newRecord) => {
    if (!uid) return
    const recordWithUid = { ...newRecord, uid}
    records.value.push({ ...recordWithUid, id: Date.now().toString() })
    await addRecordToFirestore(recordWithUid);
  }

  const deleteRecord = async (id) => {
    records.value = records.value.filter(record => record.id !== id);
    await deleteRecordFromFirestore(id)
  }

  // const saveRecordsToLocalStorage = (data) => {
  //   localStorage.setItem('records', JSON.stringify(data))
  // }
  // const loadRecordsFromLocalStorage = () => {
  //   const stored = localStorage.getItem('records')
  //   if (stored) {
  //     records.value = JSON.parse(stored)
  //   }
  // }
  // watch(records, (newRecords) => {
  //   saveRecordsToLocalStorage(newRecords)
  // }, {deep: true})
  // onMounted(loadRecordsFromLocalStorage)

  const formatDateStore = useFormatDateStore()
  const { currentMonth } = storeToRefs(formatDateStore)  
  const monthlyRecords = computed(() => {
    return records.value.filter(record => {
      const recordDate = new Date(record.date)
      return (
        recordDate.getFullYear() === currentMonth.value.getFullYear() &&
        recordDate.getMonth() === currentMonth.value.getMonth()
      )
    })
  })

  return {
    amount,
    date,
    category,
    memo,
    amountType,
    records,
    recordsByDate,
    recordsByDateSorted,
    addRecord,
    monthlyRecords,
    deleteRecord,
    // saveRecordsToLocalStorage
  }
})