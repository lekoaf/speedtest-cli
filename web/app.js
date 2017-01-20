$(document).ready(() => {

	const formatData = (data, l) => {
		return (data / l).toFixed(2);
	};

	const createCharts = (data) => {
		const labels = [];
		const pings = [];
		const uploads = [];
		const downloads = [];
		
		data.tests.forEach((test) => {
			const timestamp = test.timestamp.split('T')[1];
			labels.push(timestamp.split('.')[0]);

			pings.push(test.ping);

			const u = (test.upload * 1e-6).toFixed(2);
			uploads.push(u);

			const d = (test.download * 1e-6).toFixed(2);
			downloads.push(d);
		});

		const speedCanvas = document.getElementById('speedChart');

		const speedChart = new Chart(speedCanvas, {
			type: 'line',
			data: {
				labels: labels,
				datasets: [
					{
						label: 'Downloads mBit/s',
						data: downloads,
						backgroundColor: 'rgba(54, 162, 235, 0.2)'
					},
					{
						label: 'Uploads mBit/s',
						data: uploads,
						backgroundColor: 'rgba(255, 99, 132, 0.2)'
					}
				]
			}
		});

		const pingCanvas = document.getElementById('pingChart');

		const pingChart = new Chart(pingCanvas, {
			type: 'line',
			data: {
				labels: labels,
				datasets: [
					{
						label: 'Pings ms',
						data: pings,
						backgroundColor: 'rgba(255, 206, 86, 0.2)'
					}
				]
			}
		});
	};

	const parseData = (data) => {
		createCharts(data);

		let ping = 0;
		let upload = 0;
		let download = 0;

		data.tests.forEach((test) => {
			ping += test.ping;
			upload += test.upload * 1e-6;
			download += test.download * 1e-6;
		});

		const l = data.tests.length;

		$('#ping h2').text(formatData(ping, l));
		$('#download h2').text(formatData(download, l));
		$('#upload h2').text(formatData(upload, l));
	};

	$.get('./test.json', (data) => {
		parseData(data);
	});
});