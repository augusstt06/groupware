import { useEffect, useState } from 'react'

import { FaSearch } from 'react-icons/fa'

import InputWithLabel from '@/_component/input/InputWithLabel'
import { KAKAO_APP_KEY, KAKAO_AUTH_KEY } from '@/_constant/constant'
import { API_URL_KAKAO_MAP } from '@/_constant/route/api-route-constant'
import useInput from '@/_module/hooks/reactHooks/useInput'
import { moduleKaKaoGetFetch } from '@/_module/utils/moduleFetch'
import { type KakaoMapProps, type SchedulePlaceProps, type SearchType } from '@/_types/ui/modal'

export default function SchedulePlace(props: SchedulePlaceProps) {
  const [searchInput, setSearchInput] = useState<SearchType[]>([])
  const { setSelectedPlace, schedulePlace } = props
  const place = useInput(schedulePlace)
  const handleClickSearch = async () => {
    const res = await moduleKaKaoGetFetch({
      params: {
        query: place.value,
      },
      fetchUrl: API_URL_KAKAO_MAP,
      header: {
        Authorization: `KakaoAK ${KAKAO_AUTH_KEY}`,
      },
    })
    setSearchInput(res.documents)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      void handleClickSearch()
    }
  }
  const tailLabel = (
    <div
      className="flex items-center justify-center w-1/6 cursor-pointer smooth-transition hover:scale-110 "
      onClick={() => {
        void handleClickSearch()
      }}
    >
      <FaSearch className="w-4 h-4" />
    </div>
  )

  const isRenderMap = () => {
    return place.value !== '' && searchInput.length !== 0
  }
  return (
    <div className="justify-center sort-vertical-flex">
      <div className="sort-row-flex justify-center w-1/2 mt-4 mb-4 truncate border-2 border-gray-300 rounded-full dark:bg-[#505050]">
        <InputWithLabel
          onKeyDown={handleKeyPress}
          title=""
          isHeadLabel={false}
          type="text"
          useInput={place}
          isTailLabel={true}
          tailLabelContent={tailLabel}
          placeholder="장소를 입력해주세요."
          className="w-5/6 p-1 ml-3 text-xs focus:outline-none md:text-sm lg-text-base dark:bg-[#505050]"
        />
      </div>

      {isRenderMap() ? (
        <KaKaoMap searchData={searchInput} setSelectedPlace={setSelectedPlace} />
      ) : null}
    </div>
  )
}

export function KaKaoMap(props: KakaoMapProps) {
  const { searchData, setSelectedPlace } = props

  const mapScript = document.createElement('script')
  mapScript.async = true
  mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&autoload=false&libraries=services,clusterer,drawing`
  document.head.appendChild(mapScript)

  useEffect(() => {
    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        // 지도 생성
        const mapContainer = document.getElementById('map')
        if (mapContainer !== null) {
          const mapOption = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
          }
          const map = new window.kakao.maps.Map(mapContainer, mapOption)
          const infowindow = new window.kakao.maps.InfoWindow({
            zIndex: 1,
          })
          searchData.forEach((place) => {
            const markerPosition = new window.kakao.maps.LatLng(Number(place.y), Number(place.x))
            const marker = new window.kakao.maps.Marker({
              position: markerPosition,
            })
            window.kakao.maps.event.addListener(marker, 'click', function () {
              const content = `
                <div style="padding: 10px; background-color: #fff; border: 1px solid #ddd; display: block;">
                  <h4 style="margin-bottom: 5px; font-size: 16px;">${place.place_name}</h4>
                  <p style="font-size: 14px; color: #555;">주소: ${place.address_name}</p>
                  <p style="font-size: 14px; color: #555;">전화번호: ${place.phone}</p>
                </div>
              `

              infowindow.setContent(content)
              infowindow.open(map, marker)
              if (setSelectedPlace !== undefined) setSelectedPlace(place)
            })
            marker.setMap(map)
          })

          const bounds = new window.kakao.maps.LatLngBounds()
          searchData.forEach((place) => {
            bounds.extend(new window.kakao.maps.LatLng(Number(place.y), Number(place.x)))
          })
          map.setBounds(bounds)
        }
      })
    }
    mapScript.addEventListener('load', onLoadKakaoMap)

    return () => {
      mapScript.removeEventListener('load', onLoadKakaoMap)
    }
  }, [searchData])

  return <div id="map" style={{ width: '100%', height: '400px' }} />
}
