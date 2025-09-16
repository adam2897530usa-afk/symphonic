 
        // Slider functionality
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        const navDots = document.querySelectorAll('.nav-dot');

        function goToSlide(index) {
            slides[currentSlide].classList.remove('active');
            navDots[currentSlide].classList.remove('active');
            
            currentSlide = index;
            
            slides[currentSlide].classList.add('active');
            navDots[currentSlide].classList.add('active');
        }

        // Auto-advance slides
        setInterval(() => {
            const nextSlide = (currentSlide + 1) % slides.length;
            goToSlide(nextSlide);
        }, 4000);

        // Video player functionality
        function toggleVideo(button, videoId) {
            const video = document.getElementById(videoId);
            const container = document.getElementById(`video-container-${videoId.split('-')[0]}`);
            const progressBar = document.getElementById(`progress-${videoId.split('-')[0]}`);
            
            if (video.paused) {
                // 다른 비디오들 정지
                document.querySelectorAll('video').forEach(v => {
                    if (v !== video && !v.paused) {
                        v.pause();
                        const otherId = v.id.split('-')[0];
                        const otherBtn = document.querySelector(`[onclick*="${v.id}"]`);
                        const otherContainer = document.getElementById(`video-container-${otherId}`);
                        if (otherBtn) otherBtn.innerHTML = '▶';
                        if (otherContainer) otherContainer.style.display = 'none';
                    }
                });
                
                // 현재 비디오 재생
                video.play();
                button.innerHTML = '⏸';
                container.style.display = 'block';
                
                // 프로그레스 바 업데이트
                video.addEventListener('timeupdate', function() {
                    const progress = (video.currentTime / video.duration) * 100;
                    progressBar.style.width = progress + '%';
                });
                
                // 비디오 끝났을 때
                video.addEventListener('ended', function() {
                    button.innerHTML = '▶';
                    progressBar.style.width = '0%';
                    container.style.display = 'none';
                });
                
            } else {
                // 비디오 일시정지
                video.pause();
                button.innerHTML = '▶';
                container.style.display = 'none';
            }
        }

        // Music player functionality (기존 함수는 다른 밴드들용으로 유지)
        let currentlyPlaying = null;
        let playbackIntervals = {};

        function togglePlay(button, trackId) {
            if (currentlyPlaying && currentlyPlaying !== trackId) {
                // Stop currently playing track
                const currentBtn = document.querySelector(`[onclick*="${currentlyPlaying}"]`);
                currentBtn.innerHTML = '▶';
                clearInterval(playbackIntervals[currentlyPlaying]);
                document.getElementById(`progress-${currentlyPlaying}`).style.width = '0%';
            }

            if (currentlyPlaying === trackId) {
                // Pause current track
                button.innerHTML = '▶';
                clearInterval(playbackIntervals[trackId]);
                currentlyPlaying = null;
            } else {
                // Play new track
                button.innerHTML = '⏸';
                currentlyPlaying = trackId;
                
                // Simulate progress
                let progress = 0;
                const maxProgress = 100;
                playbackIntervals[trackId] = setInterval(() => {
                    progress += 0.5;
                    document.getElementById(`progress-${trackId}`).style.width = `${progress}%`;
                    
                    if (progress >= maxProgress) {
                        button.innerHTML = '▶';
                        clearInterval(playbackIntervals[trackId]);
                        currentlyPlaying = null;
                        setTimeout(() => {
                            document.getElementById(`progress-${trackId}`).style.width = '0%';
                        }, 500);
                    }
                }, 100);
            }
        }

        // Scroll animations
        function observeElements() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            });

            document.querySelectorAll('.fade-in').forEach(el => {
                observer.observe(el);
            });
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            observeElements();
        });
    