import * as React from "react"

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fill="#c18f07" d="M0 80h80.004V0H0v80z" />
      <g fill="#FFF">
        <path d="M40.063 14.32l9.754 5.621s.958.443 1.406 1.208c.4.688.429 1.432.429 1.432v8.779s.036 1.08-.288 1.722c-.315.632-.688.92-.688.92l-9.008 5.392s-.859.574-1.605.574-1.837-.574-1.837-.574l-8.435-4.99s-.373-.116-.947-.804c-.573-.69-.488-1.896-.488-1.72v-9.472s-.058-.571.403-1.203c.596-.82 1.147-1.032 1.147-1.032l10.157-5.853zM16.002 14.724v3.146h11.772l5.457-3.146H16.003zM64.003 14.724h-17.08l5.455 3.146h11.625v-3.138zM54.86 24.157h9.143V21.01h-9.175c.027.186.032.301.032.301v2.845zM25.148 21.019h-9.145v3.146h9.147v-3.063s-.002-.03-.002-.083M64.005 27.313h-9.142v3.144h9.142v-3.144zM16.004 30.451h9.148v-3.143h-9.148v3.143zM53.616 35.88l-1.439.863h11.826v-3.146h-9.204c-.052.378-.144.787-.306 1.111-.4.805-.877 1.172-.877 1.172M25.772 35.36c-.439-.526-.576-1.293-.614-1.77h-9.155v3.146h11.565l-.589-.35s-.477-.147-1.208-1.026M41.649 43.021h22.347c.002-.112.009-.225.009-.337v-2.809h-17.08l-4.797 2.872s-.191.128-.479.274M32.886 39.884H16.004v2.808c0 .113.006.223.009.337h22.316c-.349-.148-.59-.272-.59-.272l-4.852-2.873zM62.852 49.316c.36-1.028.641-2.078.835-3.146H41.605v3.146h21.248zM16.32 46.178a20.21 20.21 0 00.834 3.146h21.248v-3.138H16.321zM18.553 52.473a24.536 24.536 0 002.026 3.143h17.823v-3.143H18.553zM59.428 55.61a24.745 24.745 0 002.028-3.143h-19.85v3.144h17.822zM23.36 58.748a33.523 33.523 0 003.73 3.146h11.313v-3.138H23.359zM52.918 61.905a33.31 33.31 0 003.73-3.146H41.605v3.146h11.313zM32.22 65.043c1.934.996 4.003 2.29 6.182 3.033v-3.041H32.22zM47.786 65.043h-6.182v3.033c2.181-.744 4.248-2.037 6.182-3.033" />
      </g>
      <path fill="#1c1b20" d="M83.024 80h398.22V.004h-398.2V80z" />
      <g fill="#FFF">
        <path d="M367.295 34.917c-1.756 0-3.836 1.743-4.594 2.676-.763.931-2.795 4.173-2.795 4.173v14.29l-1.442-.001h-1.039c-.897 0-1.394-.54-1.394-1.395V32.806l-.002-1.399h2.436c.901 0 1.441.542 1.441 1.4v4.053l.36-.54c1.848-2.837 4.011-4.912 7.207-4.912h.182c.468 0 .84.161 1.081.447.205.236.315.562.315.951v2.112h-1.756zM263.308 44.446c0 7.75-4.959 11.985-12.348 11.985-7.703 0-12.3-4.281-12.3-11.985V23.673c0-.854.542-1.396 1.4-1.396h2.828s.008.965.008 1.396v20.773c0 5.992 3.514 8.29 8.065 8.29 4.597 0 8.111-2.3 8.111-8.29V23.673c0-.854.54-1.396 1.396-1.396h2.84v22.168zM326.35 37.766c0 8.426-4.956 16.174-7.39 18.293h-4.237c-2.476-2.119-7.03-9.867-7.03-18.293V32.81c0-.857.5-1.399 1.4-1.399h1.036l1.446-.002-.004 1.401v4.956c0 7.03 2.793 12.84 5.453 15.455 2.613-2.615 5.45-8.425 5.45-15.455V32.81c0-.856.542-1.398 1.397-1.398h1.037l1.443-.002v6.357zM341.52 41.963c3.876 0 4.955-1.397 4.955-3.832 0-2.656-1.803-3.557-4.596-3.557-4.234 0-6.67 2.118-6.67 7.074v.314h6.31zm-10.185 4.596v-4.911c0-6.715 4.551-10.589 10.544-10.589 4.909 0 8.426 2.118 8.426 7.072 0 4.374-2.795 7.03-7.706 7.03h-7.39v1.398c0 4.594 2.793 6.354 6.67 6.354 2.793 0 7.036-1.549 7.036-1.549l-.004 1.232v.992c0 .9-.094 1.214-.859 1.576-.36.18-3.38 1.262-6.172 1.262-5.993 0-10.544-2.838-10.544-9.867M375.822 38.132c0 2.253 1.534 2.478 3.515 2.975l3.018.72c3.829.899 6.847 2.432 6.847 7.21 0 5.451-4.73 7.39-9.865 7.39-2.975 0-5.813-.542-6.13-.632-.409-.104-1.068-.317-1.068-.317s-.013-.522-.013-.99v-1.216c0-.722.497-1.037 1.128-1.037.18 0 .27 0 .448.045.407.09 2.795.632 5.635.632 3.874 0 5.993-1.082 5.993-3.874 0-2.12-1.802-3.067-3.877-3.517l-3.695-.902c-3.334-.764-5.812-2.656-5.812-6.487 0-4.417 3.694-7.074 9.507-7.074 3.02 0 5.138.452 5.453.494.495.077 1.08.259 1.08.259l.001 1.05v1.261c0 .72-.542.992-1.174.992-.764 0-2.43-.542-5.36-.542-3.695 0-5.63 1.082-5.63 3.56M438.576 49.72l-1.756 1.756c-1.803 1.804-3.966 3.2-7.166 3.2-4.054 0-6.575-2.253-6.575-8.47V32.823c0-.857.537-1.397 1.394-1.397h1.082c.452 0 1.396-.004 1.396-.004v14.783c0 3.74 1.532 4.956 3.787 4.956 2.43 0 4.999-2.478 6.397-3.874l1.441-1.442V32.825c0-.857.495-1.397 1.4-1.397h1.033l1.442-.003.002 1.4v20.097c0 8.426-4.958 11.625-13.384 11.625h-2.838l-1.398-.003.001-1.44v-.674c0-.9.54-1.441 1.397-1.441h2.838c6.667 0 9.507-2.074 9.507-7.752v-3.514zM417.363 52.55c.445 0 .803.146 1.048.407.225.243.349.58.349.992v2.113s-.98.004-1.397.004h-2.118c-4.911 0-8.11-2.795-8.11-8.113v-20.77c0-.425-.005-1.395-.005-1.395l1.401-.002h1.08c.859 0 1.398.54 1.398 1.397v4.236h5.635c.9 0 1.397.54 1.397 1.395v.724c0 .465-.01 1.39-.01 1.39s-.958.007-1.387.007h-5.635v13.02c0 2.84 1.486 4.596 4.236 4.596h2.118zM301.634 25.119c0 .859-.495 1.399-1.399 1.399h-1.034l-1.444-.002.002-1.397V23.68c0-.856.54-1.398 1.441-1.398h2.431l.002 1.398v1.44zm0 29.56l-.002 1.392s-.98.004-1.397.004h-1.034c-.902 0-1.441-.542-1.441-1.397V34.942h-2.753c-.944 0-1.394-.497-1.394-1.397V31.42s.936.008 1.352.008h5.27c.904 0 1.4.54 1.4 1.396v21.854zM400.828 25.119c0 .857-.497 1.399-1.394 1.399h-1.042l-1.439-.002V23.68c0-.856.54-1.398 1.44-1.398h2.432l.002 1.398v1.44zm0 29.56l-.002 1.392s-.983.004-1.392.004h-1.041c-.9 0-1.44-.542-1.44-1.397V34.942h-2.75c-.941 0-1.393-.497-1.393-1.397V31.42s.93.008 1.349.008h5.275c.897 0 1.394.54 1.394 1.396v21.854zM273.51 36.014l1.756-1.758c1.759-1.756 3.877-3.198 7.03-3.198 3.874 0 6.669 2.116 6.669 8.469v16.532l-1.397.002h-1.038c-.902 0-1.44-.538-1.44-1.397V39.526c0-3.874-1.758-4.953-3.829-4.953-2.48 0-4.958 2.475-6.354 3.874l-1.397 1.441V56.06h-2.478c-.902 0-1.396-.537-1.396-1.396v-23.25h2.433c.9 0 1.441.542 1.441 1.399v3.2zM146.673 51.472l-1.756 1.801c-1.803 1.758-3.874 3.155-7.074 3.155-3.874 0-6.665-2.118-6.665-8.47V32.821c0-.857.54-1.397 1.394-1.397h1.082c.454 0 1.392-.007 1.392-.007s.008 1 .008 1.403v15.135c0 3.875 1.756 4.956 3.872 4.956 2.433 0 4.91-2.478 6.307-3.872l1.441-1.398V32.82c0-.857.495-1.397 1.397-1.397h1.036l1.442-.001v23.25c0 .854-.54 1.393-1.442 1.393h-1.036l-1.399-.003.002-1.39v-3.2zM168.137 34.936c-1.759 0-3.836 1.745-4.596 2.674-.758.93-2.793 4.176-2.793 4.176v14.28s-.987.004-1.442.004h-1.034c-.902 0-1.399-.541-1.399-1.396V31.428l2.433-.002c.902 0 1.442.544 1.442 1.401v4.052l.362-.542c1.846-2.838 4.01-4.908 7.207-4.908h.18c.465 0 .838.161 1.081.445.203.238.315.562.315.953v2.11h-1.756zM183.999 52.55c.445 0 .807.146 1.048.41.224.235.348.575.348.984v2.114s-.983.004-1.396.004h-2.119c-4.908 0-8.108-2.796-8.108-8.111V25.789h2.478c.854 0 1.396.54 1.396 1.396v4.234h5.63c.903 0 1.4.542 1.4 1.397v.721c0 .468-.01 1.39-.01 1.39s-.956.008-1.39.008h-5.63v13.017c0 2.842 1.486 4.598 4.234 4.598h2.118zM197.127 25.119c0 .857-.495 1.396-1.396 1.396h-1.037l-1.444-.002.002-1.394v-1.441c0-.857.542-1.396 1.442-1.396h2.43l.002 1.396v1.441zm0 29.554l-.002 1.392-1.394.002h-1.037c-.9 0-1.441-.542-1.441-1.394V34.942h-2.748c-.947 0-1.396-.497-1.396-1.399v-2.122s.933.007 1.351.007h5.27c.903 0 1.397.542 1.397 1.397v21.85zM207.33 36.014l1.756-1.756c1.756-1.758 3.874-3.2 7.029-3.2 3.874 0 6.665 2.119 6.665 8.471v15.136l.002 1.392-1.4.003h-1.034c-.901 0-1.44-.542-1.44-1.396V39.529c0-3.877-1.76-4.957-3.83-4.957-2.478 0-4.956 2.479-6.353 3.875l-1.396 1.441v14.776c0 .463-.01 1.392-.01 1.392s-1.016.004-1.432.004h-1.037c-.901 0-1.396-.542-1.396-1.397v-23.25l1.396.002h1.037c.9 0 1.441.542 1.441 1.397v3.2zM121.61 22.25c.004 0 .01.003.016.003l-.016-.002M121.63 22.25l.182.034-.183-.033" />
        <path d="M117.414 25.62c1.51 0 2.734.128 3.915.382 1.32.33 2.473.816 3.152 1.04.27.093.45.136.63.136.452 0 .767-.27.767-.9l.015-1.47.002-1.26-.047-.022c-.138-.06-.553-.245-.857-.342-.5-.193-1.72-.61-3.195-.901l-.182-.034-.016-.002a16.46 16.46 0 00-1.655-.227.792.792 0 01-.094-.012h-.004a18.758 18.758 0 00-1.71-.083c-9.866 0-16.173 5.273-16.173 15.138v4.234c0 8.783 4.55 15.138 14.775 15.138h2.118c2.613 0 5.316-.904 6.128-1.217.362-.116.904-.364.904-.364l-.002-1.26v-1.126c0-.63-.317-.901-.767-.901-.182 0-.36.047-.632.135-1.081.362-3.377 1.038-5.63 1.038h-2.118c-6.713 0-10.585-4.054-10.585-11.443v-4.234c0-8.243 4.954-11.443 11.261-11.443" />
      </g>
    </svg>
  )
}

export default SvgComponent