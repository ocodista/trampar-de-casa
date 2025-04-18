import { getRole } from 'app/utils/getRoles'
import { ImageResponse } from 'next/server'

/* export const runtime = 'edge'
export const revalidate = 3600 // revalidate every hour */

export const size = {
  width: 1200,
  height: 600,
}

export const contentType = 'image/png'

export default async function Image({ params }: { params: { id: string } }) {
  const role = await getRole(params.id)

  if (!role) {
    return new Response('Not found', { status: 404 })
  }

  const title = `${role.title} at ${role.company} - Trampar de Casa`
  const description = 'Encontre sua vaga remota aqui !'

  const fontData = await fetch(
    new URL('public/fonts/Roboto.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer())

  const imageData = await fetch(
    new URL('public/images/HO-brasil.jpg', import.meta.url)
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div tw="bg-white flex items-center justify-center w-full h-full p-10 bg-indigo-600 shadow-xl">
        <div tw="flex w-1/2 h-full">
          <img
            tw="w-full h-full flex rounded-tl-2xl rounded-bl-2xl border-r-4 border-black"
            src={role.company_logo || (imageData as unknown as string)}
            alt=""
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
        <div tw="flex flex-col bg-white w-1/2 h-full items-center justify-center rounded-tr-2xl rounded-br-2xl px-10">
          <svg
            style={{ width: 120, height: 80, marginBottom: 10 }}
            xmlns="http://www.w3.org/2000/svg"
            zoomAndPan="magnify"
            viewBox="0 0 330 187.499995"
            fill="#004AAD"
            preserveAspectRatio="xMidYMid meet"
            version="1.0"
          >
            <defs>
              <g />
              <clipPath id="c96ecf706a">
                <path
                  d="M 114 6 L 145 6 L 145 51 L 114 51 Z M 114 6 "
                  clip-rule="nonzero"
                />
              </clipPath>
              <clipPath id="1d51ddc84a">
                <path
                  d="M 0.4375 53.632812 L 84.035156 53.632812 L 84.035156 185.941406 L 0.4375 185.941406 Z M 0.4375 53.632812 "
                  clip-rule="nonzero"
                />
              </clipPath>
            </defs>
            <g clipPath="url(#c96ecf706a)">
              <g clipPath="url(#1382293a0e)">
                <g clipPath="url(#24c04074f8)">
                  <path
                    d="M 125.734375 128.890625 C 123.921875 128.953125 122.082031 128.332031 120.640625 126.992188 C 119.203125 125.65625 118.445312 123.867188 118.386719 122.046875 L 114.722656 21.894531 C 114.65625 20.082031 115.285156 18.238281 116.617188 16.808594 C 119.285156 13.941406 123.773438 13.78125 126.640625 16.453125 C 128.074219 17.785156 128.835938 19.578125 128.902344 21.394531 L 132.300781"
                    fillOpacity="1"
                    fillRule="nonzero"
                  />
                </g>
              </g>
            </g>
            <g clipPath="url(#1d51ddc84a)">
              <path
                d="M 227.050781 115.53125 C 228.136719 116.617188 228.816406 118.121094 228.816406 119.789062 C 228.816406 121.453125 228.140625 122.957031 227.050781 124.046875 L 166.964844 184.183594 C 165.878906 185.273438 164.371094 185.949219 162.710938 185.949219 C 159.386719 185.949219 156.695312 183.253906 156.695312 179.925781 C 156.695312 178.265625 157.371094 176.757812 158.457031 175.667969 L 214.300781 119.789062 L 158.457031 63.90625 C 157.371094 62.816406 156.695312 61.308594 156.695312 59.648438 C 156.695312 56.324219 159.386719 53.628906 162.710938 53.628906 C 164.371094 53.628906 165.878906 54.300781 166.964844 55.390625 Z M 66.578125 185.941406 C 66.582031 185.941406 66.582031 185.941406 66.589844 185.941406 C 69.90625 185.941406 72.597656 183.246094 72.597656 179.925781 C 72.597656 178.261719 71.925781 176.757812 70.832031 175.667969 L 14.988281 119.789062 L 70.832031 63.90625 C 71.917969 62.816406 72.589844 61.308594 72.589844 59.648438 C 72.589844 56.324219 69.898438 53.628906 66.578125 53.628906 C 64.917969 53.628906 63.410156 54.300781 62.324219 55.390625 L 2.238281 115.53125 C 1.144531 116.617188 0.472656 118.121094 0.472656 119.789062 C 0.472656 121.453125 1.144531 122.957031 2.238281 124.046875 L 62.324219 184.183594 C 63.410156 185.269531 64.914062 185.941406 66.566406 185.941406 C 66.570312 185.941406 66.570312 185.941406"
                fillOpacity="1"
                fillRule="nonzero"
              />
            </g>
            <g clipPath="url(#4f0afea1db)">
              <path
                d="M 327.632812 114.648438 C 328.722656 115.738281 329.398438 117.242188 329.398438 118.90625 C 329.398438 120.570312 328.726562 122.074219 327.632812 123.164062 L 267.550781 183.304688 C 266.460938 184.390625 264.953125 185.066406 263.296875 185.066406 C 259.972656 185.066406 257.28125 182.371094 257.28125 179.046875 C 257.28125 177.386719 257.953125 175.875 259.042969 174.789062 L 314.882812 118.90625 L 259.042969 63.023438 C 257.953125 61.9375 257.28125 60.425781 257.28125 58.765625 C 257.28125 55.441406 259.972656 52.746094 263.296875 52.746094 C 264.953125 52.746094 266.460938 53.421875 267.550781 54.507812 Z M 167.164062 185.058594 C 167.167969 185.058594 167.167969 185.058594 167.175781 "
                fillOpacity="1"
                fillRule="nonzero"
              />
            </g>
            <g clipPath="url(#6faa7a1f9b)">
              <path
                d="M 157.019531 3.300781 C 158.304688 2.019531 160.074219 1.21875 162.039062 1.21875 C 164.003906 1.21875 165.777344 2.011719 167.0625 3.300781 L 237.972656 74.125 C 239.253906 75.40625 240.050781 77.183594 240.050781 79.136719 C 240.050781 83.054688 236.871094 86.226562 232.949219 86.226562 C 230.992188 86.226562 229.214844 85.433594 227.929688 84.152344 L 162.039062 18.328125 L 96.148438 84.152344 C 94.867188 85.433594 93.085938 86.226562 91.128906 86.226562 C 87.207031 86.226562 84.03125 83.054688 84.03125 79.136719 C 84.03125 77.183594 84.824219 75.40625 86.109375 74.125"
                fillOpacity="1"
                fillRule="nonzero"
              />
            </g>
            <g fillOpacity="1">
              <g transform="translate(76.334553, 125.660065)">
                <g>
                  <path d="M 5.671875 -16.75 L -0.171875 -16.75 L -0.171875 -22.953125 L 20.140625 -22.953125 L 20.140625 -16.75 L 14.296875 -16.75 L 14.296875 0 L 5.671875 0 Z M 5.671875 -16.75 " />
                </g>
              </g>
            </g>
            <g fillOpacity="1">
              <g transform="translate(96.29101, 125.660065)">
                <g>
                  <path d="M 1.25 -22.953125 L 14.15625 -22.953125 C 16.976562 -22.953125 19.128906 -22.160156 20.609375 -20.578125 C 22.097656 -19.003906 22.84375 -16.929688 22.84375 -14.359375 C 22.84375 -12.890625 22.46875 -11.566406 21.71875 -10.390625 C 20.96875 -9.210938 19.988281 -8.21875 18.78125 -7.40625 C 19.226562 -7.101562 19.550781 -6.710938 19.75 -6.234375 L 22.453125 0 L 13.46875 0 L 11.234375 -5.09375 C 11.109375 -5.382812 10.972656 -5.582031 10.828125 -5.6875 C 10.691406 -5.789062 10.492188 -5.84375 10.234375 -5.84375 L 9.875 -5.84375 L 9.875 0 L 1.25 0 Z M 11.96875 -12.578125 C 13.375 -12.578125 14.078125 -13.171875 14.078125 -14.359375 C 14.078125 -15.003906 13.914062 -15.472656 13.59375 -15.765625 C 13.269531 -16.066406 12.78125 -16.21875 12.125 -16.21875 L 9.875 -16.21875 L 9.875 -12.578125 Z M 11.96875 -12.578125 " />
                </g>
              </g>
            </g>
            <g fillOpacity="1">
              <g transform="translate(119.668565, 125.660065)">
                <g>
                  <path d="M 9.375 -22.953125 L 18.3125 -22.953125 L 27.15625 0 L 18.171875 0 L 16.53125 -4.28125 L 11.15625 -4.28125 L 9.515625 0 L 0.53125 0 Z M 15.578125 -10.15625 L 13.828125 -14.546875 L 12.078125 -10.15625 Z M 15.578125 -10.15625 " />
                </g>
              </g>
            </g>
            <g fillOpacity="1">
              <g transform="translate(147.358139, 125.660065)">
                <g>
                  <path d="M 1.25 -22.953125 L 9.4375 -22.953125 L 14.109375 -13.46875 L 18.75 -22.953125 L 26.9375 -22.953125 L 26.9375 0 L 18.3125 0 L 18.3125 -8.0625 L 16.28125 -3.921875 L 11.90625 -3.921875 L 9.875 -8.0625 L 9.875 0 L 1.25 0 Z M 1.25 -22.953125 " />
                </g>
              </g>
            </g>
            <g fillOpacity="1">
              <g transform="translate(175.546626, 125.660065)">
                <g>
                  <path d="M 1.25 -22.953125 L 14.15625 -22.953125 C 16.050781 -22.953125 17.644531 -22.550781 18.9375 -21.75 C 20.238281 -20.957031 21.210938 -19.882812 21.859375 -18.53125 C 22.515625 -17.175781 22.84375 -15.664062 22.84375 -14 C 22.84375 -12.34375 22.476562 -10.835938 21.75 -9.484375 C 21.03125 -8.128906 20 -7.0625 18.65625 -6.28125 C 17.3125 -5.507812 15.757812 -5.125 14 -5.125 L 9.875 -5.125 L 9.875 0 L 1.25 0 Z M 11.96875 -11.875 C 12.664062 -11.875 13.191406 -12.0625 13.546875 -12.4375 C 13.898438 -12.820312 14.078125 -13.34375 14.078125 -14 C 14.078125 -15.476562 13.425781 -16.21875 12.125 -16.21875 L 9.875 -16.21875 L 9.875 -11.875 Z M 11.96875 -11.875 " />
                </g>
              </g>
            </g>
            <g fillOpacity="1">
              <g transform="translate(198.211453, 125.660065)">
                <g>
                  <path d="M 9.375 -22.953125 L 18.3125 -22.953125 L 27.15625 0 L 18.171875 0 L 16.53125 -4.28125 L 11.15625 -4.28125 L 9.515625 0 L 0.53125 0 Z M 15.578125 -10.15625 L 13.828125 -14.546875 L 12.078125 -10.15625 Z M 15.578125 -10.15625 " />
                </g>
              </g>
            </g>
            <g fillOpacity="1">
              <g transform="translate(225.901027, 125.660065)">
                <g>
                  <path d="M 1.25 -22.953125 L 14.15625 -22.953125 C 16.976562 -22.953125 19.128906 -22.160156 20.609375 -20.578125 C 22.097656 -19.003906 22.84375 -16.929688 22.84375 -14.359375 C 22.84375 -12.890625 22.46875 -11.566406 21.71875 -10.390625 C 20.96875 -9.210938 19.988281 -8.21875 18.78125 -7.40625 C 19.226562 -7.101562 19.550781 -6.710938 19.75 -6.234375 L 22.453125 0 L 13.46875 0 L 11.234375 -5.09375 C 11.109375 -5.382812 10.972656 -5.582031 10.828125 -5.6875 C 10.691406 -5.789062 10.492188 -5.84375 10.234375 -5.84375 L 9.875 -5.84375 L 9.875 0 L 1.25 0 Z M 11.96875 -12.578125 C 13.375 -12.578125 14.078125 -13.171875 14.078125 -14.359375 C 14.078125 -15.003906 13.914062 -15.472656 13.59375 -15.765625 C 13.269531 -16.066406 12.78125 -16.21875 12.125 -16.21875 L 9.875 -16.21875 L 9.875 -12.578125 Z M 11.96875 -12.578125 " />
                </g>
              </g>
            </g>
            <g fillOpacity="1">
              <g transform="translate(77.883623, 162.122786)">
                <g>
                  <path d="M 1.46875 -26.96875 L 14.28125 -26.96875 C 23.601562 -26.96875 28.265625 -22.414062 28.265625 -13.3125 C 28.265625 -8.757812 27.054688 -5.398438 24.640625 -3.234375 C 22.222656 -1.078125 18.769531 0 14.28125 0 L 1.46875 0 Z M 13.109375 -7.703125 C 14.753906 -7.703125 15.972656 -8.085938 16.765625 -8.859375 C 17.566406 -9.628906 17.96875 -11.113281 17.96875 -13.3125 C 17.96875 -14.820312 17.789062 -15.96875 17.4375 -16.75 C 17.09375 -17.53125 16.578125 -18.046875 15.890625 -18.296875 C 15.203125 -18.546875 14.273438 -18.671875 13.109375 -18.671875 L 11.59375 -18.671875 L 11.59375 -7.703125 Z M 13.109375 -7.703125 " />
                </g>
              </g>
            </g>
            <g fillOpacity="1">
              <g transform="translate(106.775364, 162.122786)">
                <g>
                  <path d="M 1.46875 -26.96875 L 23.03125 -26.96875 L 23.03125 -19.6875 L 11.59375 -19.6875 L 11.59375 -17.25 L 21.4375 -17.25 L 21.4375 -9.71875 L 11.59375 -9.71875 L 11.59375 -7.28125 L 23.03125 -7.28125 L 23.03125 0 L 1.46875 0 Z M 1.46875 -26.96875 " />
                </g>
              </g>
            </g>
            <g fillOpacity="1">
              <g transform="translate(130.014383, 162.122786)">
                <g />
              </g>
            </g>
            <g fillOpacity="1">
              <g transform="translate(142.576018, 162.122786)">
                <g>
                  <path d="M 16.75 0.421875 C 11.445312 0.421875 7.429688 -0.75 4.703125 -3.09375 C 1.984375 -5.4375 0.625 -8.898438 0.625 -13.484375 C 0.625 -18.054688 1.96875 -21.515625 4.65625 -23.859375 C 7.351562 -26.210938 11.359375 -27.390625 16.671875 -27.390625 C 18.316406 -27.390625 19.800781 -27.269531 21.125 -27.03125 C 22.445312 -26.789062 23.796875 -26.421875 25.171875 -25.921875 L 25.171875 -17.078125 C 22.628906 -18.253906 20.019531 -18.84375 17.34375 -18.84375 C 15.25 -18.84375 13.660156 -18.4375 12.578125 -17.625 C 11.503906 -16.820312 10.96875 -15.441406 10.96875 -13.484375 C 10.96875 -11.554688 11.519531 -10.179688 12.625 -9.359375 C 13.726562 -8.535156 15.328125 -8.125 17.421875 -8.125 C 20.097656 -8.125 22.707031 -8.707031 25.25 -9.875 L 25.25 -1.046875 C 23.882812 -0.546875 22.535156 -0.175781 21.203125 0.0625 C 19.878906 0.300781 18.394531 0.421875 16.75 0.421875 Z M 16.75 0.421875 " />
                </g>
              </g>
            </g>
            <g fillOpacity="1">
              <g transform="translate(168.452979, 162.122786)">
                <g>
                  <path d="M 11.015625 -26.96875 L 21.53125 -26.96875 L 31.90625 0 L 21.359375 0 L 19.4375 -5.03125 L 13.109375 -5.03125 L 11.1875 0 L 0.625 0 Z M 18.296875 -11.9375 L 16.25 -17.078125 L 14.203125 -11.9375 Z M 18.296875 -11.9375 " />
                </g>
              </g>
            </g>
            <g fillOpacity="1">
              <g transform="translate(200.987604, 162.122786)">
                <g>
                  <path d="M 10.796875 0.421875 C 8.878906 0.421875 7.039062 0.253906 5.28125 -0.078125 C 3.519531 -0.421875 2.050781 -0.882812 0.875 -1.46875 L 0.875 -9.046875 C 2.21875 -8.398438 3.703125 -7.867188 5.328125 -7.453125 C 6.960938 -7.035156 8.425781 -6.828125 9.71875 -6.828125 C 10.550781 -6.828125 11.203125 -6.929688 11.671875 -7.140625 C 12.148438 -7.347656 12.390625 -7.648438 12.390625 -8.046875 C 12.390625 -8.378906 12.191406 -8.648438 11.796875 -8.859375 C 11.410156 -9.066406 10.6875 -9.351562 9.625 -9.71875 C 8.394531 -10.132812 7.695312 -10.367188 7.53125 -10.421875 C 5.75 -11.097656 4.367188 -11.796875 3.390625 -12.515625 C 2.410156 -13.242188 1.703125 -14.109375 1.265625 -15.109375 C 0.835938 -16.117188 0.625 -17.40625 0.625 -18.96875 C 0.625 -21.8125 1.609375 -23.925781 3.578125 -25.3125 C 5.546875 -26.695312 8.515625 -27.390625 12.484375 -27.390625 C 13.796875 -27.390625 15.316406 -27.253906 17.046875 -26.984375 C 18.773438 -26.722656 20.210938 -26.425781 21.359375 -26.09375 L 21.359375 -18.46875 C 18.703125 -19.550781 16.316406 -20.09375 14.203125 -20.09375 C 12.046875 -20.09375 10.96875 -19.742188 10.96875 -19.046875 C 10.96875 -18.773438 11.160156 -18.546875 11.546875 -18.359375 C 11.941406 -18.179688 12.726562 -17.925781 13.90625 -17.59375 L 14.984375 -17.296875 C 17.140625 -16.710938 18.78125 -15.992188 19.90625 -15.140625 C 21.039062 -14.285156 21.8125 -13.304688 22.21875 -12.203125 C 22.625 -11.097656 22.828125 -9.722656 22.828125 -8.078125 C 22.828125 -5.453125 21.800781 -3.378906 19.75 -1.859375 C 17.695312 -0.335938 14.710938 0.421875 10.796875 0.421875 Z M 10.796875 0.421875 " />
                </g>
              </g>
            </g>
            <g fillOpacity="1">
              <g transform="translate(224.435986, 162.122786)">
                <g>
                  <path d="M 11.015625 -26.96875 L 21.53125 -26.96875 L 31.90625 0 L 21.359375 0 L 19.4375 -5.03125 L 13.109375 -5.03125 L 11.1875 0 L 0.625 0 Z M 18.296875 -11.9375 L 16.25 -17.078125 L 14.203125 -11.9375 Z M 18.296875 -11.9375 " />
                </g>
              </g>
            </g>
          </svg>
          <h1 tw="text-4xl font-bold leading-none tracking-tight text-center -mb-3">
            {title}
          </h1>
          <p tw="font-medium text-lg text-center">{description}</p>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Roboto',
          data: fontData,
          style: 'normal',
        },
      ],
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    }
  )
}
