const MyLoader = (props) => (
    <ContentLoader
        speed={2}
        width={280}
        height={460}
        viewBox="0 0 280 460"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="140" cy="140" r="140" />
        <rect x="0" y="286" rx="3" ry="3" width="280" height="25" />
        <rect x="0" y="320" rx="6" ry="6" width="280" height="84" />
        <rect x="0" y="417" rx="3" ry="3" width="91" height="35" />
        <rect x="40" y="443" rx="0" ry="0" width="2" height="9" />
        <rect x="140" y="410" rx="20" ry="20" width="139" height="45" />
    </ContentLoader>
)
export default MyLoader